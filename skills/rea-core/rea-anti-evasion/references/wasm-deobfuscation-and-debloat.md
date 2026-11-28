# WebAssembly (WASM) Deobfuscation & Decoy Export Pruning

## Known Counter-REA Attack Vectors
- **WASM Interface Exhaustion (`WASM_INTERFACE_REPRESENTATION_BYTES = 32 MiB`):** Generates thousands of fake/decoy exports (blowing a small 41-byte module up to ~7 MB and consuming `6x` string + `16x` signature memory budget in `wasmInterface.ts`).
- **Arity-2 Alias Spread & Export-Order Shuffling:** Renames real `mix`/`seal`/`unlock` exports to randomized identifiers, shuffles export table indices, and spreads dozens of decoy arity-2 wrappers across the export section so naive hooks on `exports[0]` or `mix` miss.
- **Sealed Data-Section Carriers & Hydrate Traps:** Hides schedule parameters behind dynamic WASM memory operations instead of `R2SEAL`/`R3PARM`/`R3CIPH` magics, or binds integrity to JS loader `self_seal`.

## Counter-Measures & Recovery Workflow

1. **Prune Decoy Exports via Live Call-Site & Import Reachability:**
   - Never disassemble or pass 10,000 shuffled decoy exports into the LLM context or REA MCP at once.
   - Inspect the JS/TS host loader around `WebAssembly.instantiate` / `WebAssembly.instantiateStreaming`: observe which exact export keys the JS host actually invokes (`instance.exports[resolvedKey](...)` captured at runtime via a `Proxy` wrapper around `instance.exports`)!
   - Build a dependency subgraph starting ONLY from host-called exports + `_start` + indirect function table (`__indirect_function_table`) targets; strip all unreached decoy exports and dead functions into a minimal `.wasm` slice using `wasm-opt` / custom section slicer before running `wasm2wat` / `wasm-decompile` / Ghidra.
2. **Dynamic JS-WASM Boundary Spying (Defeats Export Renaming & Shuffling):**
   - Inject a thin JS instrumentation shim before `WebAssembly.instantiate`:
     - Wrap every function on `result.instance.exports` in a `Proxy` logging `(exportName, args, returnValue)` and snapshotting linear `WebAssembly.Memory` slices accessed immediately before and after invocation.
   - This identifies the exact renamed `unlock` / crypto / validator export on the first live call regardless of export shuffling or arity-2 decoys.
3. **Handling `self_seal` & Split Wasm Debug (`anti-rea-forge`):**
   - If separate `.debug.wasm` / DWARF sections were split off (`split_wasm.py`), rely on DWARF-free decompilation (`wasm-decompile`) + runtime boundary witnesses.
   - If JS runs a `self_seal` hash over sibling files before instantiating WASM, compute the witness hash inside the instrumented harness or intercept at `WebAssembly.compile` after validation passes.
