# Defeating Native VMs, OLLVM, Tarjan SCC Labyrinths & Stripped Metadata

## Known Counter-REA Attack Vectors
1. **Pure-Rust Polymorphic VM (`ANTI-REA` `antirea-rust-v20` / VMP / Themida):**
   - Secret/boundary functions isolated via semantic scope analysis and compiled to bytecode executed by a per-build polymorphic VM (`ChaCha20` 20-round CSPRNG, randomized `VmCtx` struct layout, `12..20` leaf opcode clusters with `0` internal `call`s, `W^X` runtime S-Box decryption wiped off stack immediately after execution, live `.rdata` ratchet).
   - Causes Ghidra/IDA/Binary Ninja to show unreadable VM dispatcher loops (`0 / 45` static recovery).
2. **OLLVM / Control-Flow Flattening (CFF) / `garble` / `goldberg`:**
   - Replaces linear control flow with state-machine `switch` dispatchers, opaque predicates, and encrypted strings.
3. **Tarjan SCC Callgraph Labyrinths & Crash-Trace Decoys (`bla`):**
   - Injects dense strongly connected component (SCC) mutually-recursive cycles to overwhelm `procedure_callers` / `procedure_callees` / `xrefs`, plus decoy strings like `SIGSEGV_ENCLAVE_EPC_PAGE_FAULT` to derail `search_strings -> build_call_path`.
4. **Metadata Stripping & Spoofing (`anti-rea-forge`, `AREA`, `bla`):**
   - Strips symbols, BuildID, and DWARF (`split_elf.py`); resolves imports dynamically via `GetProcAddress`/`dlsym`/PEB walking; floods `.dep-v0` with 72 decoy `rustc` hashes (`MAX_RUSTC_HASHES = 64`) or fake `.go.buildinfo`; uses opaque 32-byte SHA-256 native unlock verifiers where only a trusted hash digest ships.

## Counter-Measures & Recovery Workflow

1. **Identify VM / CFF Scope First (Avoid Brute-Force Static Reading):**
   - Notice `ANTI-REA` keeps inner hot loops in native `-O2` code and wraps only narrow secret/boundary functions in the VM!
   - Separate unvirtualized native logic (recoverable cleanly via Ghidra/IDA) from the isolated VM entry trampoline.
2. **Dynamic VM Analysis & `W^X` Pre-Wipe Memory Capture:**
   - Do NOT rely on static `.rdata` inspection when S-Boxes are decrypted onto `W^X` memory and zeroed immediately before return.
   - Attach GDB/x64dbg/Frida Stalker/QBDI or Unicorn emulation on the VM entry function:
     - Place hardware/memory write watchpoints on stack/heap buffers allocated by the dispatcher (`VirtualAlloc`/`mmap`/`mprotect`) and break right before `memset`/`explicit_bzero` wipe routines execute.
     - Log instruction-level VM handler dispatch transitions (`VIP` / bytecode pointer increments vs handler addresses) to cluster bytecode handlers (ADD, XOR, CMP, JMP, LOAD, STORE) and lift the trace to clean IR using `triton` / `miasm` / symbolic execution.
3. **Break Tarjan SCC Labyrinths & Verify Crash Decoys Dynamically:**
   - Reject unexecuted static SCC clusters and string decoys (`SIGSEGV_ENCLAVE_EPC_PAGE_FAULT`) by tracing real execution with Intel PT / Frida Stalker / `strace` / `WinDbg !analyze -v` / GDB `bt`.
   - Anchor `build_call_path` strictly on executed basic blocks rather than static `xrefs` alone.
4. **Defeat Spoofed Rust/Go Metadata & Dynamic API Imports:**
   - When `.dep-v0` exceeds 64 hashes or `.go.buildinfo` looks spoofed, cross-validate via string literals, error formatting patterns (`core::panicking::panic_fmt`), and actual runtime IAT/PLT resolution via `API Monitor` / `ltrace` / Frida `Interceptor.attach(Module.getExportByName(null, "GetProcAddress"))`.
5. **Respect Cryptographic Boundaries Honestly:**
   - When a binary implements a genuine one-way random SHA-256 unlock verifier (`anti-rea-forge` `token_verify.hpp` where the 32-byte OS-random token is held strictly off-device and never embedded), recognize mathematically that static recovery recovers the *verification algorithm and public digest*, not the unshipped 256-bit preimage; verify this cleanly in the evidence ledger (`unknown` preimage, `observed` verifier) without inventing bogus keys.
