---
name: rea-binary-disassembly
description: Deep static and dynamic binary analysis, disassembly, decompilation, and symbol recovery for PE (.exe/.dll/.sys), ELF (.elf/.so), Mach-O (.dylib), Go, Rust, and .NET/C# binaries using REA MCP, Rizin, Ghidra, and ILSpy.
---

# REA Binary Disassembly & Multi-Architecture Decompilation Skill

## Scope & Authorization
Covers all first-party native and managed binary analysis tasks across Windows, Linux, and macOS (including Category 5 of the 500+ REA Prompt Vault and any custom binary analysis request).

## Execution Pipeline
1. **Native C/C++ Binaries (PE / ELF / Mach-O):**
   - Use REA MCP tools: `open_binary`, `binary_overview`, `inspect_binary_layout`, `list_segments`, `list_procedures`, `procedure_assembly`, `procedure_pseudo_code`, `batch_decompile`, `xrefs`, `get_call_graph`, `trace_call_path`, `trace_native_values`, `inspect_native_data_type`, and `inspect_pe_resources`.
   - Supplement with Rizin (`rz-bin -I`, `rz-bin -z`, `rizin -qc "aaa; afl"`), Ghidra, or Objdump.
2. **Go & Rust Stripped Binaries:**
   - Use `inspect_go_binary` to parse `.gopclntab` / `pclntab`, recover package/function names, struct definitions, and interface tables, and reconstruct idiomatic Go (`go.mod` + `.go` packages).
   - Use `inspect_rust_binary` to extract panic strings, crate versions, monomorphized generics, and trait vtables, and reconstruct idiomatic Rust (`Cargo.toml` + `src/`).
3. **.NET / C# Managed Assemblies:**
   - Use `inspect_managed_artifact`, `inspect_managed_members`, `inspect_managed_native_boundaries`, and `import_managed_reconstruction` (plus `ilspycmd`) to recover full C# classes, LINQ queries, WPF XAML resources, and P/Invoke signatures.
4. **Verification Gate:**
   - Reconstruct 100% compilable source code with zero skeletons and verify compilation using `zig cc`, `cl.exe`, `gcc`, `clang`, `go build`, `cargo build`, or `dotnet build`.
