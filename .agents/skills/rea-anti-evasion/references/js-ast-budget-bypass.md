# JavaScript AST Budget Bypass & Deobfuscation

## Known Counter-REA Attack Vectors
Anti-REA JavaScript shields (`bla-agents`, `AREA`) target fixed resource caps inside `morluto/rea` (`javascriptSemanticResourceLimits.ts`):
- `SEMANTIC_PRIMITIVE_CANDIDATE_LIMIT = 256` -> defeated via >= 9-chunk opaque ternary chains generating 512+ candidate permutations.
- `SEMANTIC_EXPRESSION_DEPTH_LIMIT = 256` -> defeated via deeply nested arithmetic identity chains (`(((a + 0) ^ 0) | 0)`).
- `SEMANTIC_GETTER_EXPANSION_LIMIT = 512` -> defeated via self-referential `Object.defineProperty` / `{ get x() ... }` getter rings.
- `SEMANTIC_ALIAS_SELECTION_LIMIT = 512` -> defeated via 528+ dynamic selector state branches.
- `SEMANTIC_PRIMITIVE_JSON_BYTES_LIMIT = 1 MiB` -> defeated via Cartesian string explosions (`codeUnits * 6 + 2`).
- Position-dependent XOR masked string splitters: `(function (s, m, c) { ... })(pieces, m, c)` where `pieces` are spelled in letters `a`–`p` behind number-theoretic opaque predicates like `(7 * x * x - 1) % 7 !== (y * y) % 7` or bitwise-to-arithmetic rewrites of `&`, `|`, `^`.

## Counter-Measures & Recovery Workflow

1. **Pre-Normalize AST Before REA Ingestion:**
   - Run an AST simplification pass (Babel / `@babel/parser` + `@babel/traverse` or `oxc` / `swc` / `webcrack`) on isolated bundle copies to:
     - Constant-fold arithmetic identity chains and bitwise-emulation expressions.
     - Eliminate dead branches guarded by provably invariant predicates (check with a quick Z3 / Node evaluation check on sample integers).
     - Flatten single-use variable aliases and proxy dispatcher functions (`_0x...`).
2. **Recover `a-p` / Position-XOR String Decoders Dynamically:**
   - Do **NOT** enumerate ternary combinations statically (which explodes past 256 candidates).
   - Extract the tiny self-contained decoder IIFE (`(function(s, m, c){...})(pieces, m, c)`), evaluate it inside a networkless Node `vm.runInNewContext` sandbox (with zero `fs`/`process`/`require` access) or execute the target script with a read-only `Proxy` / breakpoint on sink APIs (`fetch`, `ipcRenderer.send`, `crypto.createDecipheriv`, `RegExp`).
3. **Neutralize Self-Referential Getter Rings:**
   - Limit static getter unrolling to depth 4 and track visited `(objectId, propertyName)` pairs in a `Set` to break cyclic getter evaluation before hitting the 512 expansion cap.
4. **Separate Classic Script Window Pollution:**
   - If hardening injected ~160 decoy `var` declarations onto `globalThis` plus one non-enumerable state slot (`Object.getOwnPropertyNames(globalThis)`), snapshot `Object.getOwnPropertyNames(globalThis)` before and after evaluating module initialization to isolate genuine application bindings.
