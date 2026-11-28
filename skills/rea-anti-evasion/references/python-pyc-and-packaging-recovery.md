# Defeating Python Obfuscation, Stripped `.pyc` Headers & Integrity Sidecars

## Known Counter-REA Attack Vectors (`bla`, `AREA`, `anti-rea-forge`)
1. **Python `weave_decoys` & Module Bloat (`bla` `format-python.md`):**
   - Threads decoy calls through genuine `FunctionDef` bodies touching shared state slots behind opaque-false guards, injects 9–22 decoy top-level functions (`~50 KB` per file even on a 75-byte `__init__.py`), and accesses builtins via a single private `import builtins as _...` alias.
2. **`sidecar_entangle` Load-Time Integrity Checks:**
   - Elects `policy.py`, CLI console script targets, `__main__.py`, or `__init__.py` to hash all hardened sibling `.py` files on import and halt with `integrity binding mismatch` if a single file is edited or deobfuscated.
3. **Stripped `.pyc` Headers & PyInstaller Trailer Decoys (`AREA`, `bla`):**
   - Strips magic/timestamp headers from `.pyc` files or appends decoy trailing code objects / CArchive padding in PyInstaller onefile bundles (`pyinstxtractor`).
4. **Nuitka / Cython Compiled Modules (`.pyd` / `.so`):**
   - Compiles sensitive Python modules down to native C extensions using Python C-API (`PyObject_Call`, `PyDict_GetItemString`).

## Counter-Measures & Recovery Workflow

1. **Neutralizing `weave_decoys` & Recovering Clean Python AST:**
   - Inspect module top-level definitions for generated builtin alias imports (`import builtins as _...`) and opaque number-theoretic conditionals (`(7 * x * x - 1) % 7 != (y * y) % 7`).
   - Run dynamic Python trace coverage (`python -m trace --count` or `sys.settrace`) across functional test suites to identify executed lines vs dead opaque-false decoy branches.
   - Strip dead decoy functions and unwrap builtin aliases back to clean Python 3 idiomatic syntax.
2. **Handling `sidecar_entangle` Safely During Debugging:**
   - Always work on an isolated copy of the target project. Locate the load-time hash guard (`integrity binding mismatch` string or SHA-256 directory walker inside entry `__init__.py`/`policy.py`) and bypass/recompute hashes if testing local instrumentation patches.
3. **Recovering Stripped `.pyc` Files & PyInstaller Bundles:**
   - Extract PyInstaller bundles using `pyinstxtractor-ng` (handles PyInstaller 2.0–6.x CArchive and PYZ archives cleanly, ignoring trailing padding).
   - If `.pyc` files lack the 16-byte header (magic + bitfield + mtime + size), determine the embedded Python runtime version from `python3XX.dll` / `libpython3.XX.so` inside the bundle, prepend the exact 16-byte magic header (e.g., Python 3.11 = `a7 0d 0d 0a ...`, 3.12 = `cb 0d 0d 0a ...`), and decompile with `pycdc` / `PyLingual` / `dis.dis`.
4. **Cython / Nuitka `.pyd`/`.so` Recovery:**
   - Load the compiled extension in Ghidra/IDA alongside Python C-API symbols (`PyObject_*`, `PyUnicode_*`, `__Pyx_*` for Cython) and correlate runtime arguments with Frida/Python `sys.addaudithook` or `cProfile` hooks.
