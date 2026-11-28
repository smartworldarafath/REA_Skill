# Defeating JavaScript Honey Traps, Poisoned Prompts & Shadow Logic

## Known Counter-REA Attack Vectors
Modern Counter-REA frameworks (`bla-agents`, `DeRea`) plant active misinformation to trick both REA static graphs and the LLM agent reading them:
- **VLQ v3 Honey SourceMaps:** Bundlers inject valid-looking `.map` files or inline `sourceMappingURL` data URIs whose `names`/`sourcesContent` map to decoy business rules or fabricated auth gates that do NOT match actual compiled execution.
- **Prompt & Obligation Poisoning:** Exploits `ReconstructionObligationLedgerProjection.ts` lexicographical sorting (`compareUnicodeCodePoints`) by prefixing fake critical modules with `$00_AAA_enclave_` so they float to the top of the obligation queue, and floods all 22 obligation families (`>68` fake obligations).
- **Duplicate Decoy IPC Channels:** De-literalizes genuine `ipcRenderer.invoke` / `ipcMain.handle` names while registering dozens of fake literal IPC strings so static pairing picks the decoys.
- **Woven Shadow Business Logic & `globalThis` Churn:** Genuine functions share a `sharedStateSlots` object (e.g., `sessionLedgerState.digest`) with plausible decoy helpers (`2/3` mundane stems like `session`, `ledger`, `quota`, `epoch` + `1/3` security stems like `attest`, `commitment`, `seal`) plus ~60ns per-call shadow heap churn to defeat naive memory diffing.

## Counter-Measures & Recovery Workflow

1. **Cross-Verify SourceMaps Against Runtime Execution (Never Blindly Trust `.map`):**
   - Compare mapped source functions against actual minified bytecode call sites (`source-map` consumer + runtime stack trace).
   - If a `.map` claims a function handles payment/license checks but runtime breakpoints on the mapped offset never fire (or show unrelated arithmetic churn), discard the honey `.map` immediately and analyze the raw JS bundle directly.
2. **Filter Lexicographical & Decoy Naming Traps:**
   - Never prioritize symbols solely by alphabetical sort (`$00_AAA_*`).
   - Run `scripts/rea-preflight-sanitize.mjs` to flag `$00_AAA_`, `_bla_`, fake telemetry/enclave identifiers, and repeated decoy function templates.
3. **Recover Real IPC Channels via Runtime Hooking:**
   - In Electron or Node, wrap `ipcMain.handle` / `ipcRenderer.invoke` / `ipcRenderer.send` at startup (or via preload/Frida/CDP) and log `(channelName, args, stackTrace)` during actual user actions. Only live-observed channels enter the reconstruction ledger.
4. **Prune Shadow Business Logic via Coverage & Data-Flow Taint:**
   - Instrument the target with V8 coverage (`NODE_V8_COVERAGE`) or Playwright/Node debugger execution over real positive and negative test inputs.
   - Any helper guarded by opaque-false branches (`0%` branch hit across comprehensive functional tests) or writing only to sinkless shadow slots is classified as dead decoy scaffolding and excluded from final source reconstruction.
