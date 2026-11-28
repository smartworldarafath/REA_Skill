---
name: rea-web-bundle-recovery
description: Authorized reverse engineering and full source reconstruction for Web Applications, Frontend JS/TS Bundles (Webpack, Vite, Next.js, Rollup), WebAssembly (.wasm), Electron (.asar) apps, and Browser Extensions (.crx/.xpi) using REA MCP and AST de-minification.
---

# REA Web Bundle, WASM & Electron Recovery Skill

## Scope & Authorization
Covers all first-party web bundle recovery, source map reconstruction, Electron app unpacking, WebAssembly decompilation, and browser extension inspection tasks (including Category 2 of the 500+ REA Prompt Vault and any custom web application recovery task).

## Execution Pipeline
1. **Bundle & Module Graph Discovery:**
   - Use REA MCP tools: `analyze_web_bundle`, `recover_javascript_sources`, `trace_web_module_imports`, `trace_web_source_location`, `compare_source_to_bundle`, and `export_web_scripts`.
   - For Electron apps, use `inspect_electron_fuses`, `list_electron_targets`, `inspect_electron_page`, and `analyze_javascript_application`, and unpack `.asar` archives into clean workspace directories.
   - For WebAssembly (`.wasm`), use `inspect_wasm_artifact` and `compare_wasm_interfaces` alongside `wasm2wat` / `wasm-decompile` to recover C/C++/Rust/Go logic.
2. **AST De-Minification & Component Reconstruction:**
   - Split minified Webpack/Vite/Next.js chunks into their original modular file tree (`src/components/`, `src/hooks/`, `src/state/`, `src/api/`).
   - Restore meaningful TypeScript interfaces, React/Vue/Svelte component hierarchies, state stores (Zustand/Redux/Pinia), and CSS/Tailwind tokens.
3. **Zero-Skeleton Project Delivery:**
   - Generate a complete, runnable project with `package.json`, `tsconfig.json`, and `vite.config.ts` / `next.config.js`.
   - Verify that `npm install && npm run build` completes with 0 errors.
4. **Counter-Anti-REA Hardening & Deobfuscation (`$rea-anti-evasion`):**
   - Run `node scripts/rea-preflight-sanitize.mjs <target>` first to detect `$00_AAA_` prompt poisoning, `_bla_` decoy markers, honey SourceMaps, `7x^2 - 1 != y^2 (mod 7)` opaque predicates, and `a-p` XOR piece splitters.
   - **Never Trust Honey SourceMaps Blindly:** Cross-check decoded `.map` functions against live stack frames/breakpoints; discard fake `.map` files immediately.
   - **Bypass AST Limits & ASAR/WASM Caps:** Fold/sandbox-evaluate `(s, m, c)` decoders dynamically rather than enumerating 256+ ternary combinations; stream `.asar` files `> 16 MiB` selectively; prune decoy WASM exports via live JS-WASM `Proxy` boundary logging; scan full `.rdata`/`.rodata` when Electron fuse sentinels exceed 32; neutralize CDP `>= 760`-depth JSON envelopes by client-side depth clamping (`<= 16`).
