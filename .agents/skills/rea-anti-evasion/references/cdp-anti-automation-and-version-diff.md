# Defeating CDP Anti-Automation Traps & Polymorphic Version Diff Noise

## Known Counter-REA Attack Vectors (`bla`, `AREA`)
1. **CDP Shape Budget Breaker (`CdpCaptureEvents.ts`):**
   - Intentionally emits JSON bodies and WebSocket payloads nested `>= 780` levels deep to trip REA's CDP depth budget (`depth >= 760`) and crash/abort capture inspection.
2. **Browser Anti-CDP & Bot Guards (`AREA`):**
   - Detects `navigator.webdriver === true`, headless user agents, DevTools timing (`debugger` loop + `console.log` getter side effects), strips WebMCP manifests, and enforces strict CSP blocking inline instrumentation scripts.
3. **Polymorphic Build Diff Noise (`diff-noise-injector.ts`, `AREA` per-build seed):**
   - `compare_application_versions` and `compare_functions` get confused by per-build re-obfuscation seeds, identifier randomization, and isomorphic `switch`/state-machine permutations between v1 and v2.

## Counter-Measures & Recovery Workflow

1. **Bounded CDP Payload Capture:**
   - When capturing live web/WebSocket sessions, attach a browser script / Playwright `page.route` or CDP `Network.responseReceived` filter that safely truncates/flattens JSON objects deeper than `64` levels BEFORE storing or forwarding into `inspect_web_network_capture` / `compare_web_captures`.
   - Flag any endpoint emitting 700+ depth envelopes as an intentional Counter-REA tarpit (`cdp-shape-budget-breaker`) and isolate its genuine top-level keys (`0..16` depth).
2. **Authorized First-Party Browser Inspection When Anti-CDP Triggers:**
   - For user-owned web apps where `debugger;` loops or DevTools checks interfere:
     - Configure Playwright / Chromium launch args cleanly or intercept `Function.prototype.constructor` / `eval` calls checking `debugger` via `page.addInitScript` on the authorized local session (`delete Object.getPrototypeOf(navigator).webdriver`).
     - Inspect network contracts via local HTTPS proxy (`mitmproxy` / `HTTP Toolkit`) or Playwright `page.on('request')` / `page.on('response')` at the transport layer, which operates completely outside in-page `console.log` / `debugger` traps!
3. **Semantic Normalization Before `compare_application_versions`:**
   - Do **NOT** rely on raw symbol names or literal AST switch ordering across obfuscated builds (`_0x1a` vs `_0x9f`).
   - Compare builds using **Structural & Behavioral Fingerprints**:
     - API/route endpoints hit (`POST /api/...`, external URLs)
     - Imported DOM/Node sink signatures (`crypto`, `fetch`, `localStorage`, `fs`)
     - Normalized CFG invariants (constant pool literals recovered dynamically, string-decoder output sets, call-site fan-in/fan-out)
     - Identical black-box input/output differential testing between v1 and v2!
