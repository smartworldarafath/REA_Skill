#!/usr/bin/env node
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  measureJsonNestingDepth,
  scanTextArtifact,
  scanSqliteBuffer,
  scanAndSanitizePlist,
  scanSafetensorsBuffer,
  scanBinaryArtifact,
  inspectTarget,
} from './rea-preflight-sanitize.mjs';

test('detects JS prompt poisoning, opaque predicates, and a-p XOR decoder traps', () => {
  const poisonedJs = `
    function $00_AAA_enclave_init() {
      const x = 11, y = 3;
      const cond = (7 * x * x - 1) % 7 !== (y * y) % 7 ? "a" : "b";
      const s1 = (function(s, m, c){ return s[0]; })(["abcdefgh"], 1, 2);
      const s2 = (function(s, m, c){ return s[0]; })(["ijklmnop"], 3, 4);
      return cond + s1 + s2;
    }
  `;
  const findings = scanTextArtifact('bundle.js', poisonedJs);
  const vectors = findings.map(f => f.vector);
  assert.ok(vectors.includes('prompt-completion-poison'));
  assert.ok(vectors.includes('opaque-predicate-tarpit'));
  assert.ok(vectors.includes('ap-xor-string-split'));
});

test('detects SQLite GENERATED ALWAYS AS VIRTUAL trap without executing SQL', () => {
  const header = Buffer.from('SQLite format 3\0CREATE TABLE secrets(id INT, val TEXT GENERATED ALWAYS AS (enclave_unseal_payload(id)) VIRTUAL);', 'latin1');
  const findings = scanSqliteBuffer('trap.sqlite', header);
  assert.equal(findings.length, 1);
  assert.equal(findings[0].vector, 'sqlite-generated-virtual-trap');
});

test('detects and sanitizes XML Plist empty DOCTYPE internal subset trap', () => {
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd" []>\n<plist version="1.0"><dict/></plist>';
  const { findings, sanitized } = scanAndSanitizePlist('Info.plist', xml, { sanitize: true });
  assert.equal(findings.length, 1);
  assert.equal(findings[0].vector, 'plist-doctype-internal-subset-abort');
  assert.ok(!sanitized.includes('[]'));
  assert.ok(sanitized.includes('PropertyList-1.0.dtd">'));
});

test('detects Safetensors >32 nesting breaker in 8-byte header', () => {
  let nested = '"ok"';
  for (let i = 0; i < 36; i++) nested = `[${nested}]`;
  const json = `{"_bla_nesting_breaker":${nested}}`;
  const jsonBuf = Buffer.from(json, 'utf8');
  const lenBuf = Buffer.alloc(8);
  lenBuf.writeBigUInt64LE(BigInt(jsonBuf.length), 0);
  const fullBuf = Buffer.concat([lenBuf, jsonBuf]);

  const findings = scanSafetensorsBuffer('model.safetensors', fullBuf);
  assert.equal(findings.length, 1);
  assert.equal(findings[0].vector, 'safetensors-nesting-breaker');
  assert.ok(measureJsonNestingDepth(json) > 32);
});

test('detects >32 decoy Electron fuse sentinels and anti-Frida probes in binaries', () => {
  const sentinel = 'dL7pKGdnNz796PcsjQACMA==';
  const payload = sentinel.repeat(35) + '127.0.0.1:27042 frida-agent SIGSEGV_ENCLAVE_EPC_PAGE_FAULT';
  const findings = scanBinaryArtifact('app.exe', Buffer.from(payload, 'latin1'));
  const vectors = findings.map(f => f.vector);
  assert.ok(vectors.includes('electron-decoy-fuse-sentinels'));
  assert.ok(vectors.includes('antirea-vm-or-crash-decoy'));
  assert.ok(vectors.includes('anti-frida-probe'));
});

test('clean repository fixture yields zero trap findings', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rea-clean-'));
  try {
    fs.writeFileSync(path.join(tmpDir, 'index.js'), 'export function add(a, b) { return a + b; }\n', 'utf8');
    const report = inspectTarget(tmpDir);
    assert.equal(report.filesScanned, 1);
    assert.equal(report.trapCount, 0);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
