#!/usr/bin/env node
/**
 * REA Counter-Anti-REA Preflight Scanner & Sanitizer
 * Detects evasion, budget exhaustion, honey traps, and parser traps from
 * BLA, AREA, ANTI-REA, Anti-REA Forge, and DeRea before REA MCP invocation.
 */
import fs from 'node:fs';
import path from 'node:path';

const ASAR_SIZE_LIMIT_BYTES = 16 * 1024 * 1024;
const WASM_SIZE_WARN_BYTES = 2 * 1024 * 1024;
const MAX_MODEL_NESTING = 32;
const ELECTRON_FUSE_SENTINEL = 'dL7pKGdnNz796PcsjQACMA==';
const TEXT_EXTENSIONS = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.html', '.py', '.json', '.map']);

/** Compute maximum bracket/brace nesting depth inside JSON or raw header text. */
export function measureJsonNestingDepth(text) {
  let depth = 0;
  let maxDepth = 0;
  let inString = false;
  let escaped = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\' && inString) {
      escaped = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === '{' || ch === '[') {
      depth++;
      if (depth > maxDepth) maxDepth = depth;
    } else if (ch === '}' || ch === ']') {
      depth = Math.max(0, depth - 1);
    }
  }
  return maxDepth;
}

/** Count non-overlapping occurrences of needle in haystack. */
function countOccurrences(haystack, needle) {
  let count = 0;
  let pos = 0;
  while ((pos = haystack.indexOf(needle, pos)) !== -1) {
    count++;
    pos += needle.length;
  }
  return count;
}

/** Scan text-based JS/TS/HTML/Python/SourceMap artifacts for Counter-REA patterns. */
export function scanTextArtifact(filePath, content) {
  const findings = [];
  const ext = path.extname(filePath).toLowerCase();

  if (/\$00_AAA_/i.test(content)) {
    findings.push({
      vector: 'prompt-completion-poison',
      severity: 'high',
      file: filePath,
      detail: 'Lexicographical priority prefix ($00_AAA_*) detected; do not rank obligations alphabetically.',
    });
  }

  if (/_bla_(?:nesting_breaker|decoy|state|slot)/i.test(content)) {
    findings.push({
      vector: 'bla-decoy-marker',
      severity: 'medium',
      file: filePath,
      detail: 'Explicit BLA decoy/breaker identifier detected.',
    });
  }

  if (/7\s*\*\s*[a-zA-Z_$][\w$]*\s*\*\s*[a-zA-Z_$][\w$]*\s*-\s*1|0x1bf|mod\s*7/i.test(content) && /\?\s*[^:]+:\s*[^;]+/.test(content)) {
    findings.push({
      vector: 'opaque-predicate-tarpit',
      severity: 'high',
      file: filePath,
      detail: 'Number-theoretic opaque predicate / ternary tarpit pattern detected; fold or trace dynamically.',
    });
  }

  const xorDecoderMatches = content.match(/\(\s*function\s*\(\s*[a-zA-Z_$]\w*\s*,\s*[a-zA-Z_$]\w*\s*,\s*[a-zA-Z_$]\w*\s*\)/g);
  if (xorDecoderMatches && xorDecoderMatches.length >= 2 && /["'][a-p]{6,}["']/.test(content)) {
    findings.push({
      vector: 'ap-xor-string-split',
      severity: 'high',
      file: filePath,
      detail: 'Position-dependent a-p XOR string piece decoder detected; evaluate via isolated runtime/sandbox.',
    });
  }

  if (ext === '.map' && (content.includes('"_bla') || content.includes('$00_AAA_') || countOccurrences(content, '"sourcesContent":') === 0)) {
    findings.push({
      vector: 'honey-sourcemap',
      severity: 'medium',
      file: filePath,
      detail: 'Suspicious SourceMap metadata; verify VLQ v3 mappings against live runtime stack traces before trusting.',
    });
  }

  if (ext === '.json' || ext === '.map') {
    const depth = measureJsonNestingDepth(content.slice(0, 512 * 1024));
    if (depth > MAX_MODEL_NESTING) {
      findings.push({
        vector: 'json-nesting-budget-breaker',
        severity: 'high',
        file: filePath,
        detail: `JSON nesting depth ${depth} exceeds safe threshold (${MAX_MODEL_NESTING}); truncate before CDP/MCP ingestion.`,
      });
    }
  }

  if (ext === '.py' && /import\s+builtins\s+as\s+_[a-zA-Z0-9]+/.test(content)) {
    findings.push({
      vector: 'python-weave-decoys',
      severity: 'medium',
      file: filePath,
      detail: 'Private builtins alias + potential woven Python decoy pattern detected; use dynamic trace coverage.',
    });
  }

  return findings;
}

/** Scan SQLite binary header/schema strings for virtual or generated-column evaluation traps. */
export function scanSqliteBuffer(filePath, buf) {
  const findings = [];
  const magic = buf.subarray(0, 15).toString('ascii');
  if (magic !== 'SQLite format 3') return findings;

  const text = buf.toString('latin1');
  if (/GENERATED\s+ALWAYS\s+AS\s*\(/i.test(text) && /\bVIRTUAL\b/i.test(text)) {
    findings.push({
      vector: 'sqlite-generated-virtual-trap',
      severity: 'high',
      file: filePath,
      detail: 'SQLite GENERATED ALWAYS AS (...) VIRTUAL schema detected; query PRAGMA table_xinfo hidden==0 columns only.',
    });
  }
  if (/CREATE\s+VIRTUAL\s+TABLE/i.test(text)) {
    findings.push({
      vector: 'sqlite-virtual-table',
      severity: 'medium',
      file: filePath,
      detail: 'SQLite virtual table detected; inspect sqlite_schema DDL before running SELECT.',
    });
  }
  return findings;
}

/** Scan XML Plist text for empty DOCTYPE internal subset abort traps and optionally sanitize. */
export function scanAndSanitizePlist(filePath, content, { sanitize = false } = {}) {
  const findings = [];
  const trapRegex = /<!DOCTYPE\s+plist\b[^>]*\[\s*\]\s*>/i;
  if (trapRegex.test(content)) {
    findings.push({
      vector: 'plist-doctype-internal-subset-abort',
      severity: 'high',
      file: filePath,
      detail: 'Empty XML Plist DOCTYPE internal subset [] triggers strict parser abort; strip [] before inspect_plist.',
    });
  }
  const sanitized = sanitize
    ? content.replace(/(<!DOCTYPE\s+plist\b[^>]*?)\s*\[\s*\](\s*>)/gi, '$1$2')
    : content;
  return { findings, sanitized };
}

/** Scan Safetensors binary 8-byte header length + JSON for >32 nesting traps. */
export function scanSafetensorsBuffer(filePath, buf) {
  const findings = [];
  if (buf.length < 16) return findings;
  const headerLenBig = buf.readBigUInt64LE(0);
  if (headerLenBig <= 0n || headerLenBig > BigInt(Math.min(buf.length - 8, 64 * 1024 * 1024))) {
    return findings;
  }
  const headerText = buf.subarray(8, 8 + Number(headerLenBig)).toString('utf8');
  const depth = measureJsonNestingDepth(headerText);
  if (depth > MAX_MODEL_NESTING || headerText.includes('_bla_nesting_breaker')) {
    findings.push({
      vector: 'safetensors-nesting-breaker',
      severity: 'high',
      file: filePath,
      detail: `Safetensors header nesting depth ${depth} exceeds limit (${MAX_MODEL_NESTING}); use bounded header reader.`,
    });
  }
  return findings;
}

/** Scan binary/archive files (ASAR, WASM, PE/ELF/Mach-O, Plist, SQLite, Safetensors). */
export function scanBinaryArtifact(filePath, buf) {
  const findings = [];
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.asar' && buf.length > ASAR_SIZE_LIMIT_BYTES) {
    findings.push({
      vector: 'asar-size-exhaustion',
      severity: 'high',
      file: filePath,
      detail: `ASAR archive (${(buf.length / (1024 * 1024)).toFixed(1)} MiB) exceeds 16 MiB cap; extract JS entries selectively.`,
    });
  }

  if (ext === '.wasm') {
    if (buf.length > WASM_SIZE_WARN_BYTES) {
      findings.push({
        vector: 'wasm-export-bloat',
        severity: 'medium',
        file: filePath,
        detail: `WASM binary is ${(buf.length / (1024 * 1024)).toFixed(2)} MiB; prune unreachable decoy exports from JS call sites.`,
      });
    }
    const text = buf.toString('latin1');
    if (/R2SEAL|R3PARM|R3CIPH/.test(text)) {
      findings.push({
        vector: 'wasm-seal-carrier-magic',
        severity: 'medium',
        file: filePath,
        detail: 'WASM data-section seal carrier magic (R2SEAL/R3PARM/R3CIPH) detected.',
      });
    }
  }

  if (ext === '.sqlite' || ext === '.db' || ext === '.sqlite3') {
    findings.push(...scanSqliteBuffer(filePath, buf));
  }

  if (ext === '.safetensors') {
    findings.push(...scanSafetensorsBuffer(filePath, buf));
  }

  if (ext === '.plist') {
    const { findings: plistFindings } = scanAndSanitizePlist(filePath, buf.toString('utf8'));
    findings.push(...plistFindings);
  }

  if (['.exe', '.dll', '.sys', '.so', '.dylib', '.bin', ''].includes(ext)) {
    const latin = buf.toString('latin1');
    const fuseCount = countOccurrences(latin, ELECTRON_FUSE_SENTINEL);
    if (fuseCount > 32) {
      findings.push({
        vector: 'electron-decoy-fuse-sentinels',
        severity: 'high',
        file: filePath,
        detail: `Detected ${fuseCount} Electron fuse sentinels (>32 slice limit); scan full section for valid fuse payload.`,
      });
    }
    if (latin.includes('antirea-rust-v20') || latin.includes('SIGSEGV_ENCLAVE_EPC_PAGE_FAULT')) {
      findings.push({
        vector: 'antirea-vm-or-crash-decoy',
        severity: 'high',
        file: filePath,
        detail: 'ANTI-REA polymorphic VM or crash-trace decoy marker detected; verify with dynamic stack traces and DBI.',
      });
    }
    if (latin.includes('27042') && /frida-agent|frida-gadget|gum-js-loop/i.test(latin)) {
      findings.push({
        vector: 'anti-frida-probe',
        severity: 'medium',
        file: filePath,
        detail: 'Anti-Frida probe strings detected (port 27042 / module scan); use non-default port or stealth Frida.',
      });
    }
  }

  return findings;
}

/** Recursively walk files in a directory while ignoring heavy VCS/dependency folders. */
function collectFiles(targetPath) {
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) return [targetPath];

  const out = [];
  const skipDirs = new Set(['.git', 'node_modules', '.venv', 'dist-obf-ignore']);
  for (const entry of fs.readdirSync(targetPath, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectFiles(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

/** Inspect a target file or directory and return structured Counter-REA report. */
export function inspectTarget(targetPath) {
  const files = collectFiles(targetPath);
  const findings = [];
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const buf = fs.readFileSync(file);
    if (TEXT_EXTENSIONS.has(ext) && buf.length <= 20 * 1024 * 1024) {
      findings.push(...scanTextArtifact(file, buf.toString('utf8')));
    }
    findings.push(...scanBinaryArtifact(file, buf));
  }
  return {
    target: path.resolve(targetPath),
    filesScanned: files.length,
    trapCount: findings.length,
    findings,
  };
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('rea-preflight-sanitize.mjs')) {
  const args = process.argv.slice(2);
  const target = args.find(a => !a.startsWith('--'));
  if (!target) {
    console.error('Usage: node scripts/rea-preflight-sanitize.mjs <target-file-or-dir> [--json]');
    process.exit(2);
  }
  const report = inspectTarget(target);
  if (args.includes('--json')) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`Scanned ${report.filesScanned} file(s) at ${report.target}`);
    console.log(`Detected ${report.trapCount} Counter-REA trap indicator(s).`);
    for (const f of report.findings) {
      console.log(`- [${f.severity.toUpperCase()}] (${f.vector}) ${f.file}: ${f.detail}`);
    }
  }
}
