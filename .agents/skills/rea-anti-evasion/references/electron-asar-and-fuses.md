# Electron ASAR Inflation & Electron Fuse Bypass

## Known Counter-REA Attack Vectors
- **ASAR > 16 MiB Inflation:** Hardening shields pack decoy blobs/assets into `app.asar` to push the archive size above REA's default `16 MiB` limit so static ingestion aborts or drops chunks.
- **Decoy Fuse Sentinels (`maximumSentinelsPerSlice = 32`):** Appends 33+ fake `f171...` fuse sentinel patterns into the Electron binary so `ElectronFuseReader.ts` stops before inspecting the genuine fuse slice.
- **Locked Electron Fuses & Runtime Restrictions (`AREA`):** Flips `RunAsNode = DISABLED`, `EnableNodeOptionsEnvironmentVariable = DISABLED`, `EnableNodeCliInspectArguments = DISABLED`, `EnableEmbeddedAsarIntegrityValidation = ENABLED`, and `OnlyLoadAppFromAsar = ENABLED` to block `--inspect`, `NODE_OPTIONS`, and plain ASAR edits.

## Counter-Measures & Recovery Workflow

1. **Streamed ASAR Unpacking Without Size Caps:**
   - Inspect the ASAR JSON header directly (`npx @electron/asar list app.asar` or streaming offset reads of the 16-byte header + JSON index) BEFORE extracting.
   - Measure per-file sizes in the ASAR header; skip multi-megabyte zeroed/random padding decoy blobs (`> 5 MiB` static assets unrelated to JS entry points) and extract only `package.json`, `main` entry, `preload`, and renderer JS/HTML bundles into a clean workspace directory.
2. **Accurate Multi-Slice Electron Fuse Parsing:**
   - Do not stop scanning at the first 32 sentinel occurrences. Scan the entire `.rdata`/`.rodata`/`__TEXT,__const` section for the genuine Electron fuse sentinel (`dL7pKGdnNz796PcsjQACMA==` / hex `644c37704b47646e4e7a3739365063736a5141434d413d3d`) followed by valid version byte + fuse length byte + `0x30`/`0x31` ASCII boolean array.
   - Filter out malformed/unreferenced decoy sentinels lacking valid post-sentinel fuse bit structures.
3. **Authorized Dynamic Debugging When Fuses Lock `--inspect`:**
   - Remember: Electron Fuses only block CLI flags (`--inspect`, `NODE_OPTIONS`), NOT process memory inspection by the machine owner.
   - For first-party owner debugging: attach Frida/WinDbg/GDB to the running Chromium/Node render & main processes, hook V8/Node module loaders (`Module._compile`, `v8::ScriptCompiler::Compile`), or run an authorized copy with the fuse bytes patched in the binary + matching ASAR header hash updated (`@electron/fuses` + `@electron/asar` re-pack) when diagnosing lost source code.
4. **Recovering V8 Bytecode (`.jsc` / `bytenode`):**
   - Inspect V8 version header inside `.jsc`, attach inside the exact matching Electron/V8 runtime or use `viewtube`/`v8_decompiler` / `ghidra_v8` to recover bytecode constants and disassembly, hooking native API boundaries for full functional equivalence.
