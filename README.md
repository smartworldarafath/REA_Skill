<div align="center">
  <img src="assets/animated-icon.svg" width="110" height="110" alt="REA_Skill Icon" />
  <br />
  <img src="assets/animated-text.svg" alt="REA_Skill — Reverse Engineer Anything & Security Intelligence Suite" />

# REA_Skill

**Reverse Engineering, Lost Source Code Recovery, Security Assessment & Multi-Agent Skills for Claude Code, Codex, Cursor & Antigravity — 100 drop-in `SKILL.md` files across 25 categories.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-100-red.svg)](#skill-index)
[![Categories](https://img.shields.io/badge/categories-25-orange.svg)](#categories)
[![Prompts](https://img.shields.io/badge/prompts-500%2B-0284c7.svg)](https://smartworldarafath.github.io/REA_Skill/#prompt-vault)
[![REA MCP](https://img.shields.io/badge/REA-Reverse%20Engineer%20Anything-ff6b00.svg)](https://github.com/morluto/rea)
[![Stars](https://img.shields.io/github/stars/smartworldarafath/REA_Skill?style=social)](https://github.com/smartworldarafath/REA_Skill)
[![Forks](https://img.shields.io/github/forks/smartworldarafath/REA_Skill?style=social)](https://github.com/smartworldarafath/REA_Skill/network/members)

<p align="center">
  <a href="#supported-platforms--mcp-configuration"><img src="assets/logos/direct/google-antigravity.svg" width="28" height="28" alt="Google Antigravity" title="Google Antigravity" /></a>&nbsp;&nbsp;&nbsp;
  <a href="#supported-platforms--mcp-configuration"><img src="assets/logos/direct/claude.svg" width="28" height="28" alt="Claude Code" title="Claude Code" /></a>&nbsp;&nbsp;&nbsp;
  <a href="#supported-platforms--mcp-configuration"><img src="assets/logos/direct/codex.svg" width="28" height="28" alt="OpenAI Codex" title="OpenAI Codex" /></a>&nbsp;&nbsp;&nbsp;
  <a href="#supported-platforms--mcp-configuration"><img src="assets/logos/direct/cursor.svg" width="28" height="28" alt="Cursor IDE" title="Cursor IDE" /></a>&nbsp;&nbsp;&nbsp;
  <a href="#supported-platforms--mcp-configuration"><img src="assets/logos/direct/copilot.svg" width="28" height="28" alt="GitHub Copilot" title="GitHub Copilot" /></a>&nbsp;&nbsp;&nbsp;
  <a href="#supported-platforms--mcp-configuration"><img src="assets/logos/direct/jules.svg" width="28" height="28" alt="Google Jules" title="Google Jules" /></a>&nbsp;&nbsp;&nbsp;
  <a href="#supported-platforms--mcp-configuration"><img src="assets/logos/direct/kimi.svg" width="28" height="28" alt="Moonshot Kimi" title="Moonshot Kimi" /></a>&nbsp;&nbsp;&nbsp;
  <a href="#supported-platforms--mcp-configuration"><img src="assets/logos/direct/openclaw.svg" width="28" height="28" alt="OpenClaw" title="OpenClaw" /></a>&nbsp;&nbsp;&nbsp;
  <a href="#supported-platforms--mcp-configuration"><img src="assets/logos/direct/opencode.svg" width="28" height="28" alt="OpenCode" title="OpenCode" /></a>
</p>

[Overview](#overview) &bull; [Quickstart](#quickstart) &bull; [Categories](#categories) &bull; [Skill Index](#skill-index) &bull; [Mindmap](MINDMAP.md) &bull; [Platforms & MCP](#supported-platforms--mcp-configuration) &bull; [Roadmap](#roadmap) &bull; [Contributing](#contributing)

</div>

---

## Overview

`REA_Skill` is a unified library of **100 specialized skills across 25 categories** built for the [Claude Skills system](https://docs.claude.com), [OpenAI Codex](https://openai.com), [Google Antigravity](https://deepmind.google), Cursor, Windsurf, and Cline. It combines:

1. **REA (Reverse Engineer Anything) Core & Full Source Recovery (12 skills):** Disassemble PE/ELF/Mach-O binaries, decompile Android APKs/iOS IPAs, unpack Webpack/Vite/WASM/Electron bundles, dissect PCAP/Protobuf protocols, extract Unity/Unreal/Godot game assets, and reconstruct **100% compilable source code with zero skeletons (`// TODO` banned)**.
2. **Multi-Agent Intelligence & Browser MCP Suite (9 skills):** First-party owner authorization, Everything Claude Code (ECC) engineering rigor, Agent Reach zero-fee internet intelligence, SurfSense air-gapped RAG, and triple-engine browser automation (Playwright, Bright Data, Hyperbrowser).
3. **23-Category Security Assessment & Vulnerability Research Library (79 skills integrated from `claude-red`):** Structured `SKILL.md` methodologies spanning Web OWASP Top 10, JWT/OAuth, Active Directory, Wireless/BLE/Zigbee/LoRa, Cloud, Mobile MASVS, IoT/Firmware, Binary Mitigations, Crash Analysis, Coverage-Guided Fuzzing (AFL++/libFuzzer), APIs, Containers/Kubernetes, CI/CD, Cryptography, Supply Chain, and AI/LLM Security.

Drop `REA_Skill` into your coding agent and it operates like a senior reverse engineer and security architect: skills load progressively on demand based on conversational triggers—zero wasted context window.

**Interactive Website, 500+ Unblocked Prompt Vault & AI Prompt Builder &rarr; [https://smartworldarafath.github.io/REA_Skill/](https://smartworldarafath.github.io/REA_Skill/)**

---

## Quickstart

### 1. Claude Code Native Plugin (Recommended)

```bash
/plugin marketplace add smartworldarafath/REA_Skill
/plugin install rea-skills@smartworldarafath
```

### 2. Universal Agent Skills CLI (`skills.sh`)

Works across Claude Code, OpenAI Codex, Google Antigravity, Cursor, and Windsurf:

```bash
npx skills add smartworldarafath/REA_Skill
```

### 3. Claude Skills System (`~/.claude/skills`)

```bash
git clone https://github.com/smartworldarafath/REA_Skill ~/.claude/skills/rea-skills
```

To install only specific categories via sparse checkout:

```bash
git clone --filter=blob:none --sparse https://github.com/smartworldarafath/REA_Skill
cd REA_Skill && git sparse-checkout set skills/rea-core skills/web skills/exploit-dev
```

### 4. Interactive Install Script (`./install.sh`)

```bash
./install.sh                               # interactive target prompt
./install.sh --target ~/.claude/skills     # explicit target directory
./install.sh --category rea-core           # install single category
./install.sh --category web                # install web security category
./install.sh --list                        # list all 25 categories & counts
```

### 5. Direct CLI System Prompt Piping

```bash
cat skills/rea-core/rea-full-code-recovery/SKILL.md | claude --system-file -
cat skills/web/offensive-sqli/SKILL.md | claude --system-file -
```

### 6. Connect REA MCP Server

```bash
npx -y rea-agents@latest setup
npx skills add morluto/rea --skill reverse-engineer-anything
```

---

## Categories

| Category | Skills | Focus |
|---|---:|---|
| [Reverse Engineering & Source Recovery](#reverse-engineering--source-recovery) | 12 | Full A–Z lost source code recovery, PE/ELF/Mach-O disassembly, APK/IPA, WASM, PCAP, SQLite, Unity/Unreal, firmware & interactive grilling |
| [Multi-Agent Ecosystem & Browser MCPs](#multi-agent-ecosystem--browser-mcps) | 9 | Owner authorization, 10-layer website audit, ECC TDD rigor, Agent Reach, SurfSense RAG, Playwright, Bright Data & Hyperbrowser |
| [Web Application](#web-application) | 16 | OWASP Top 10, SQLi, XSS, SSRF, SSTI, XXE, IDOR, RCE, deserialization, race conditions, request smuggling, GraphQL & business logic |
| [Auth & Identity](#auth--identity) | 2 | JWT implementation auditing (`alg:none`, key confusion, claims) and OAuth 2.0 / OIDC flow verification (PKCE, `redirect_uri`) |
| [Active Directory](#active-directory) | 2 | On-prem & hybrid AD security auditing, Kerberos, ACLs, ADCS ESC1–15, SMB/LDAP signing & channel binding |
| [Wireless](#wireless) | 14 | 802.11, WPA2-PSK, WPA3-SAE, 802.1X/EAP, WPS, rogue AP detection, KRACK/FragAttacks, 802.11w PMF, BLE, Classic BT, Zigbee/Matter, Z-Wave & LoRaWAN |
| [Cloud](#cloud) | 1 | AWS, Azure, and GCP IAM least-privilege review, IMDSv2 enforcement, storage ACLs & cross-account trust boundaries |
| [Mobile](#mobile) | 1 | Android and iOS OWASP MASVS assessment, manifest/plist auditing, Keystore/Keychain, TLS pinning & Frida runtime triage |
| [IoT & Embedded](#iot--embedded) | 1 | Hardware debug lockdown (UART/JTAG/SWD), SPI flash encryption, Secure Boot chains, signed OTA updates & RTOS protection |
| [Infrastructure & Hardening](#infrastructure--hardening) | 7 | External attack surface, Purple Team MITRE ATT&CK validation, EDR telemetry health, PIC/loader analysis, Windows mitigations (ACG/CFG/CET/HVCI) & UAC/IL boundaries |
| [Exploit Mitigations & Crash Analysis](#exploit-mitigations--crash-analysis) | 6 | Memory corruption root-cause analysis, WinDbg/GDB/ASan crash triage, compiler hardening (RELRO/PIE/CFI), stack/format auditing & TOCTOU races |
| [Fuzzing & Vulnerability Research](#fuzzing--vulnerability-research) | 4 | Coverage-guided fuzzing (AFL++, libFuzzer, Honggfuzz), harness engineering, static/CodeQL variant analysis & CWE vulnerability taxonomy |
| [Reconnaissance](#reconnaissance) | 2 | External Attack Surface Management (EASM), Certificate Transparency logs, ASN/DNS inventory & drift monitoring |
| [API Security](#api-security) | 2 | OWASP API Top 10 across REST/GraphQL/gRPC/WebSocket, schema validation, pagination bounds & idempotency enforcement |
| [Container & Kubernetes](#container--kubernetes) | 2 | Container runtime isolation (capabilities, seccomp, rootless) and Kubernetes RBAC, Pod Security Standards & NetworkPolicies |
| [CI/CD & Pipeline](#cicd--pipeline) | 2 | GitHub Actions / GitLab CI workflow hardening (`pull_request_target`, SHA pinning) and OIDC secretless workload federation |
| [Cryptography](#cryptography) | 2 | Applied cryptography auditing (AEAD AES-GCM/ChaCha20, CSPRNG, Argon2id) and TLS 1.3 / PKI / HSTS / mTLS configuration |
| [Privilege Escalation](#privilege-escalation) | 2 | Linux (SUID, capabilities, sudoers, systemd) and Windows (service ACLs, unquoted paths, token privileges, DLL search order) boundary audits |
| [Post-Exploitation & Segmentation](#post-exploitation--segmentation) | 3 | Internal network microsegmentation, endpoint autoruns/persistence baseline auditing, and DLP egress protection |
| [Forensics & Network Detection](#forensics--network-detection) | 2 | Immutable SIEM/audit log integrity, MFT/EventLog tamper detection, and JA3/JA4/beacon network threat hunting |
| [Supply Chain](#supply-chain) | 2 | SLSA build provenance, Sigstore/Cosign signing, CycloneDX/SPDX SBOMs, and private registry dependency-confusion prevention |
| [Social Engineering & Email Auth](#social-engineering--email-auth) | 2 | SPF/DKIM/DMARC `p=reject` enforcement, FIDO2/WebAuthn passkeys, and helpdesk identity verification workflows |
| [Network Attacks](#network-attacks) | 1 | Layer 2/3 switch hardening: Dynamic ARP Inspection (DAI), DHCP Snooping, 802.1X, LLMNR/NBT-NS disablement & VLAN isolation |
| [AI Security](#ai-security) | 1 | OWASP LLM Top 10: direct/indirect prompt injection defenses, tool-call sandboxing, RAG ACLs & output validation |
| [Utility](#utility) | 2 | Rapid 15-minute pre-release security triage checklist and CVSS v3.1/v4.0 executive & technical report authoring |

---

## Skill Index

### Reverse Engineering & Source Recovery

`skills/rea-core/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`rea-universal-orchestrator`](skills/rea-core/rea-universal-orchestrator/SKILL.md) | Master artifact auto-detection & router for all 500+ Prompt Vault templates and custom reverse-engineering tasks |
| [`rea-grill-me`](skills/rea-core/rea-grill-me/SKILL.md) | *(User-Invoked)* Relentless frontier-question interview to scope reverse engineering, source recovery, or audit plans |
| [`rea-grilling`](skills/rea-core/rea-grilling/SKILL.md) | Interactive decision-tree interrogation engine computing compiler, fidelity, asset, and verification trade-offs |
| [`rea-full-code-recovery`](skills/rea-core/rea-full-code-recovery/SKILL.md) | Autonomous end-to-end A–Z lost source code recovery with Zero-Skeleton Law and 1-click multi-compiler (`build.bat`/`build.sh`) verification |
| [`rea-binary-disassembly`](skills/rea-core/rea-binary-disassembly/SKILL.md) | Complete Windows PE (`.exe`/`.dll`/`.sys`), Linux ELF (`.so`/`.deb`/`.AppImage`), and macOS Mach-O static & dynamic binary disassembly |
| [`rea-mobile-app-recovery`](skills/rea-core/rea-mobile-app-recovery/SKILL.md) | Android (APK/AAB/DEX/JNI/Flutter/React Native/Unity) & iOS (IPA/Mach-O/Swift) reconstruction + 5-Pillar MASVS scanner |
| [`rea-web-bundle-recovery`](skills/rea-core/rea-web-bundle-recovery/SKILL.md) | Webpack/Vite/Next.js AST de-minification, source map recovery, WebAssembly (`.wasm`) decompilation & Electron `.asar` unpacking |
| [`rea-protocol-api-recovery`](skills/rea-core/rea-protocol-api-recovery/SKILL.md) | PCAP packet dissection, Protobuf/gRPC `.proto` descriptor recovery, WebSockets, GraphQL & working client/server SDK generation |
| [`rea-database-storage-recovery`](skills/rea-core/rea-database-storage-recovery/SKILL.md) | SQLite, Realm, LevelDB, Apple `NSKeyedArchiver` / binary `plist`, Windows Registry hives & custom binary format parsers |
| [`rea-game-asset-recovery`](skills/rea-core/rea-game-asset-recovery/SKILL.md) | Unity (`Il2CppDumper`/`AssetStudio`), Unreal (`.pak`), Godot (`.pck`), HLSL/SPIR-V/GLSL shader decompilation & 3D/audio extraction |
| [`rea-performance-crash-triage`](skills/rea-core/rea-performance-crash-triage/SKILL.md) | Windows Minidump (`.dmp`), Linux core & macOS `.ips` forensics, Frida dynamic hooking & Flameox CPU flamegraphs |
| [`rea-firmware-iot-extension`](skills/rea-core/rea-firmware-iot-extension/SKILL.md) | Embedded firmware (`binwalk`/`unblob`, RTOS/ARM/MIPS/RISC-V), EVM smart contract bytecode & RF/signal decoding |

### Multi-Agent Ecosystem & Browser MCPs

`skills/agent-ecosystem/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`rea-owner-authorization`](skills/agent-ecosystem/rea-owner-authorization/SKILL.md) | Persistent first-party owner authorization preventing false-positive refusals on user-owned software and binaries |
| [`rea-personal-use-authorization`](skills/agent-ecosystem/rea-personal-use-authorization/SKILL.md) | Maximum-effort directive for personal debugging, lost-source recovery, and pre-release vulnerability auditing |
| [`website-security-audit`](skills/agent-ecosystem/website-security-audit/SKILL.md) | 5-Phase & 10-Layer defensive website vulnerability scanner (HSTS/CSP/CORS headers, bundle secrets, RLS, APIs, webhooks) |
| [`ecc-workflow`](skills/agent-ecosystem/ecc-workflow/SKILL.md) | Everything Claude Code (ECC) engineering harness: Research & Reuse, Plan First, TDD, Code Review & Zero-Secret Gate |
| [`agent-reach`](skills/agent-ecosystem/agent-reach/SKILL.md) | Zero-fee read-only internet intelligence across X/Twitter, Reddit, YouTube transcripts, GitHub, LinkedIn & Bilibili |
| [`surfsense`](skills/agent-ecosystem/surfsense/SKILL.md) | Air-gapped, privacy-first local documentation intelligence and codebase RAG powered by SurfSense |
| [`playwright-mcp`](skills/agent-ecosystem/playwright-mcp/SKILL.md) | Microsoft Playwright MCP for structured DOM accessibility-tree navigation, live browser interaction & E2E verification |
| [`brightdata-mcp`](skills/agent-ecosystem/brightdata-mcp/SKILL.md) | Bright Data MCP for anti-bot unlocking, CAPTCHA bypass, residential proxy routing & SERP extraction |
| [`hyperbrowser-mcp`](skills/agent-ecosystem/hyperbrowser-mcp/SKILL.md) | Hyperbrowser MCP for cloud headless browser sessions, dynamic SPA crawling & session recording |

### Web Application

`skills/web/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-sqli`](skills/web/offensive-sqli/SKILL.md) | SQL injection auditing — error-based, blind, OOB, DB-specific syntax, ORM pitfalls & parameterized remediation |
| [`offensive-xss`](skills/web/offensive-xss/SKILL.md) | Cross-site scripting — reflected, stored, DOM-based, mutation XSS (mXSS), sink taint tracking & CSP hardening |
| [`offensive-ssrf`](skills/web/offensive-ssrf/SKILL.md) | Server-side request forgery — URL parser differentials, DNS rebinding, IMDSv2 enforcement & egress allowlisting |
| [`offensive-ssti`](skills/web/offensive-ssti/SKILL.md) | Server-side template injection — Jinja2/Twig/Freemarker/Handlebars context analysis & sandboxed rendering |
| [`offensive-xxe`](skills/web/offensive-xxe/SKILL.md) | XML external entity — external DTD/entity resolution auditing across XML/SOAP/SAML/SVG/DOCX & parser hardening |
| [`offensive-idor`](skills/web/offensive-idor/SKILL.md) | Insecure direct object references (BOLA/IDOR) — horizontal/vertical privilege matrices, tenant isolation & RLS checks |
| [`offensive-file-upload`](skills/web/offensive-file-upload/SKILL.md) | File upload security — magic-byte validation, path traversal, Zip Slip, polyglots & isolated object storage |
| [`offensive-rce`](skills/web/offensive-rce/SKILL.md) | Remote code execution — command injection sink auditing, argument separation, dynamic eval removal & sandboxing |
| [`offensive-deserialization`](skills/web/offensive-deserialization/SKILL.md) | Insecure deserialization — Java, .NET, PHP, Python & Node serialization gadget reachability & safe schema formats |
| [`offensive-race-condition`](skills/web/offensive-race-condition/SKILL.md) | Race conditions — TOCTOU windows, HTTP/2 single-packet concurrent testing, row locking & idempotency keys |
| [`offensive-request-smuggling`](skills/web/offensive-request-smuggling/SKILL.md) | HTTP request smuggling — CL.TE, TE.CL, H2.CL downgrade desync & reverse-proxy framing normalization |
| [`offensive-open-redirect`](skills/web/offensive-open-redirect/SKILL.md) | Open redirect — returnUrl validation, authority confusion, OAuth token leakage prevention & strict allowlists |
| [`offensive-parameter-pollution`](skills/web/offensive-parameter-pollution/SKILL.md) | HTTP parameter pollution — duplicate query/body/JSON key precedence across gateways and backend frameworks |
| [`offensive-graphql`](skills/web/offensive-graphql/SKILL.md) | GraphQL security — introspection control, query depth/complexity limits, batching rate limits & resolver authz |
| [`offensive-waf-bypass`](skills/web/offensive-waf-bypass/SKILL.md) | WAF normalization audit — encoding discrepancies, body inspection limits & root application-layer remediation |
| [`offensive-business-logic`](skills/web/offensive-business-logic/SKILL.md) | Business logic flaws — workflow state machine enforcement, boundary/negative value checks & multi-step invariants |

### Auth & Identity

`skills/auth/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-jwt`](skills/auth/offensive-jwt/SKILL.md) | JWT security — `alg:none` rejection, RS256/HS256 key confusion, `jwk`/`jku`/`kid` injection, secret entropy & claim checks |
| [`offensive-oauth`](skills/auth/offensive-oauth/SKILL.md) | OAuth 2.0 & OIDC — exact `redirect_uri` validation, PKCE (`S256`) enforcement, `state` CSRF binding & account linking |

### Active Directory

`skills/active-directory/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-active-directory`](skills/active-directory/offensive-active-directory/SKILL.md) | Active Directory methodology — Kerberoast/AS-REP exposure, BloodHound ACL paths, ADCS ESC1–15, delegation & tiering |
| [`offensive-netexec`](skills/active-directory/offensive-netexec/SKILL.md) | Enterprise protocol audit — SMB signing, LDAP signing/channel binding, NTLM relay mitigation & LAPS verification |

### Wireless

`skills/wireless/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-wifi`](skills/wireless/offensive-wifi/SKILL.md) | 802.11 wireless security overview — SSID segmentation, WPA2/WPA3/802.1X architecture & assessment planning |
| [`offensive-wifi-recon`](skills/wireless/offensive-wifi-recon/SKILL.md) | Wireless airspace audit — 2.4/5/6 GHz spectrum mapping, beacon/cipher enumeration & rogue AP detection |
| [`offensive-wpa2-psk`](skills/wireless/offensive-wpa2-psk/SKILL.md) | WPA2-PSK assessment — EAPOL 4-way handshake / PMKID exposure analysis, passphrase entropy & WPA3 migration |
| [`offensive-wpa3-sae`](skills/wireless/offensive-wpa3-sae/SKILL.md) | WPA3-SAE audit — transition-mode downgrade checks, mandatory 802.11w PMF verification & H2E support |
| [`offensive-wpa-enterprise`](skills/wireless/offensive-wpa-enterprise/SKILL.md) | WPA-Enterprise (802.1X/EAP) — EAP-TLS vs PEAP/TTLS, supplicant RADIUS certificate validation & NAC isolation |
| [`offensive-wps`](skills/wireless/offensive-wps/SKILL.md) | Wi-Fi Protected Setup (WPS) — beacon IE inspection, Pixie Dust offline/online PIN risk check & WPS disablement |
| [`offensive-evil-twin`](skills/wireless/offensive-evil-twin/SKILL.md) | Rogue AP resilience — WIDS/WIPS detection verification, auto-connect hygiene & certificate-pinned 802.1X profiles |
| [`offensive-krack-fragattacks`](skills/wireless/offensive-krack-fragattacks/SKILL.md) | 802.11 protocol patches — KRACK key reinstallation & FragAttacks aggregation firmware patch verification |
| [`offensive-deauth-disassoc`](skills/wireless/offensive-deauth-disassoc/SKILL.md) | Management Frame Protection — 802.11w (PMF) enforcement auditing for deauthentication/disassociation frames |
| [`offensive-bluetooth-ble`](skills/wireless/offensive-bluetooth-ble/SKILL.md) | Bluetooth Low Energy (BLE) — GATT service/characteristic permissions, LE Secure Connections (ECDH) & bonding |
| [`offensive-bluetooth-classic`](skills/wireless/offensive-bluetooth-classic/SKILL.md) | Bluetooth Classic (BR/EDR) — SDP enumeration, Secure Simple Pairing, KNOB/BIAS key entropy & HID restrictions |
| [`offensive-zigbee-thread-matter`](skills/wireless/offensive-zigbee-thread-matter/SKILL.md) | 802.15.4 mesh security — Zigbee install codes, Trust Center key rotation, Thread commissioning & Matter DAC/PAA |
| [`offensive-z-wave`](skills/wireless/offensive-z-wave/SKILL.md) | Z-Wave security — S2 ECDH DSK commissioning verification, legacy S0 downgrade prevention & hub hardening |
| [`offensive-lorawan-sub-ghz`](skills/wireless/offensive-lorawan-sub-ghz/SKILL.md) | LoRaWAN & Sub-GHz RF — OTAA vs ABP provisioning, secure element AppKey storage & frame counter replay checks |

### Cloud

`skills/cloud/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-cloud`](skills/cloud/offensive-cloud/SKILL.md) | Multi-cloud audit (AWS/Azure/GCP) — IAM privilege escalation paths, IMDSv2, storage bucket ACLs & cross-account trust |

### Mobile

`skills/mobile/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-mobile`](skills/mobile/offensive-mobile/SKILL.md) | Android & iOS MASVS audit — manifest/plist review, Keystore/Keychain storage, TLS pinning & Frida runtime triage |

### IoT & Embedded

`skills/iot/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-iot`](skills/iot/offensive-iot/SKILL.md) | IoT/OT & embedded security — UART/JTAG lockdown, flash encryption, Secure Boot chains, signed OTA & RTOS hardening |

### Infrastructure & Hardening

`skills/infrastructure/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-initial-access`](skills/infrastructure/offensive-initial-access/SKILL.md) | External perimeter audit — internet-facing asset inventory, VPN/ZTNA MFA enforcement & edge appliance patching |
| [`offensive-advanced-redteam`](skills/infrastructure/offensive-advanced-redteam/SKILL.md) | Purple Team & adversary emulation — MITRE ATT&CK telemetry validation, SOC alerting & detection gap analysis |
| [`offensive-edr-evasion`](skills/infrastructure/offensive-edr-evasion/SKILL.md) | EDR sensor resilience — ETW, AMSI, kernel callback telemetry verification & tamper-protection auditing |
| [`offensive-shellcode`](skills/infrastructure/offensive-shellcode/SKILL.md) | PIC & loader analysis — position-independent code disassembly, PEB resolution patterns & ACG/CFG/W^X verification |
| [`offensive-keylogger-arch`](skills/infrastructure/offensive-keylogger-arch/SKILL.md) | Input API telemetry & defense — monitoring `SetWindowsHookEx`/`RawInput`/`evdev`, UIPI isolation & detection rules |
| [`offensive-windows-mitigations`](skills/infrastructure/offensive-windows-mitigations/SKILL.md) | Windows exploit mitigations — High-Entropy ASLR, DEP, CFG, XFG, Intel CET Shadow Stacks & HVCI verification |
| [`offensive-windows-boundaries`](skills/infrastructure/offensive-windows-boundaries/SKILL.md) | Windows security boundaries — Mandatory Integrity Control (MIC), AppContainer sandboxes & privileged RPC/ALPC/COM audit |

### Exploit Mitigations & Crash Analysis

`skills/exploit-dev/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-exploit-development`](skills/exploit-dev/offensive-exploit-development/SKILL.md) | Memory corruption root-cause analysis — stack/heap overflows, UAF lifecycle tracking & sanitizer verification |
| [`offensive-exploit-dev-course`](skills/exploit-dev/offensive-exploit-dev-course/SKILL.md) | Binary security curriculum — x86_64/ARM64 calling conventions, stack layouts, allocator internals & compiler flags |
| [`offensive-basic-exploitation`](skills/exploit-dev/offensive-basic-exploitation/SKILL.md) | Stack & format string audit — unsafe C library sink removal, `-fstack-protector-strong` & `-Wformat-security` |
| [`offensive-crash-analysis`](skills/exploit-dev/offensive-crash-analysis/SKILL.md) | Crash dump triage — WinDbg/GDB/LLDB analysis, ASan/MSan/UBSan interpretation & minimal reproducer generation |
| [`offensive-mitigations`](skills/exploit-dev/offensive-mitigations/SKILL.md) | Compiler & linker hardening — Full RELRO, PIE, Stack Canaries, `_FORTIFY_SOURCE=3`, Clang CFI & SafeStack |
| [`offensive-toctou`](skills/exploit-dev/offensive-toctou/SKILL.md) | Filesystem & kernel TOCTOU — symlink/oplock race auditing, double-fetch bugs & atomic `openat2` remediation |

### Fuzzing & Vulnerability Research

`skills/fuzzing/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-fuzzing`](skills/fuzzing/offensive-fuzzing/SKILL.md) | Coverage-guided fuzzing — AFL++, libFuzzer, Honggfuzz & Cargo-Fuzz harness writing, corpus curation & sanitizers |
| [`offensive-fuzzing-course`](skills/fuzzing/offensive-fuzzing-course/SKILL.md) | Automated bug discovery curriculum — greybox, grammar, snapshot & differential fuzzing in CI/CD (OSS-Fuzz) |
| [`offensive-bug-identification`](skills/fuzzing/offensive-bug-identification/SKILL.md) | Static & variant bug hunting — CodeQL/Semgrep taint tracking, sink-to-source reachability & security patch diffing |
| [`offensive-vuln-classes`](skills/fuzzing/offensive-vuln-classes/SKILL.md) | Software vulnerability taxonomy — CWE reference across integer, memory, parser differential & state machine flaws |

### Reconnaissance

`skills/recon/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-osint`](skills/recon/offensive-osint/SKILL.md) | External asset discovery — Certificate Transparency logs, DNS/ASN mapping, cloud asset inventory & git leak checks |
| [`offensive-osint-methodology`](skills/recon/offensive-osint-methodology/SKILL.md) | Structured attack-surface management — continuous asset cataloging, SaaS dependency mapping & drift alerting |

### API Security

`skills/api/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-api-security`](skills/api/offensive-api-security/SKILL.md) | REST, GraphQL & gRPC API audit — OWASP API Top 10, BOLA/BFLA, mass assignment, OpenAPI validation & mTLS |
| [`offensive-api-abuse`](skills/api/offensive-api-abuse/SKILL.md) | API business logic & anti-scraping — pagination bounds, bulk export controls, idempotency & cost-based rate limits |

### Container & Kubernetes

`skills/container/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-container-escape`](skills/container/offensive-container-escape/SKILL.md) | Container isolation — `--privileged` & capability auditing (`CAP_SYS_ADMIN`), seccomp/AppArmor & rootless namespaces |
| [`offensive-k8s-attacks`](skills/container/offensive-k8s-attacks/SKILL.md) | Kubernetes cluster audit — RBAC least privilege, Pod Security Standards, kubelet/etcd auth & CNI NetworkPolicies |

### CI/CD & Pipeline

`skills/cicd/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-cicd-pipeline`](skills/cicd/offensive-cicd-pipeline/SKILL.md) | CI/CD pipeline hardening — `pull_request_target` safety, expression injection, SHA-pinned actions & ephemeral runners |
| [`offensive-cicd-secrets`](skills/cicd/offensive-cicd-secrets/SKILL.md) | CI/CD secret hygiene — OIDC workload federation, scoped `GITHUB_TOKEN` permissions, log masking & vault gates |

### Cryptography

`skills/crypto/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-crypto-attacks`](skills/crypto/offensive-crypto-attacks/SKILL.md) | Cryptographic implementation audit — AEAD (AES-GCM/ChaCha20), nonce uniqueness, constant-time checks, CSPRNG & Argon2id |
| [`offensive-tls-attacks`](skills/crypto/offensive-tls-attacks/SKILL.md) | TLS/SSL & PKI configuration — TLS 1.3 enforcement, ECDHE forward secrecy, HSTS preload, CAA records & mTLS |

### Privilege Escalation

`skills/privesc/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-linux-privesc`](skills/privesc/offensive-linux-privesc/SKILL.md) | Linux privilege boundary audit — SUID/SGID, file capabilities, `sudoers` rules, systemd unit ACLs & sysctl hardening |
| [`offensive-windows-privesc`](skills/privesc/offensive-windows-privesc/SKILL.md) | Windows privilege boundary audit — service/registry ACLs, unquoted paths, token privileges & DLL search order |

### Post-Exploitation & Segmentation

`skills/post-exploitation/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-lateral-movement`](skills/post-exploitation/offensive-lateral-movement/SKILL.md) | Internal segmentation audit — Credential Guard, Local Account Token Filter, host firewalls & zero-trust bastions |
| [`offensive-persistence`](skills/post-exploitation/offensive-persistence/SKILL.md) | Endpoint persistence hunting — Registry Run keys, scheduled tasks, WMI subscriptions, systemd units & PAM integrity |
| [`offensive-data-exfiltration`](skills/post-exploitation/offensive-data-exfiltration/SKILL.md) | DLP & egress protection — DNS/HTTPS egress filtering, VPC Service Controls & bulk query anomaly detection |

### Forensics & Network Detection

`skills/forensics/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-anti-forensics`](skills/forensics/offensive-anti-forensics/SKILL.md) | Forensic readiness & log integrity — immutable SIEM forwarding, EventLog/auditd tamper detection & MFT consistency |
| [`offensive-c2-frameworks`](skills/forensics/offensive-c2-frameworks/SKILL.md) | C2 traffic hunting — JA3/JA4 TLS fingerprinting, beacon jitter statistical analysis & DNS tunneling detection |

### Supply Chain

`skills/supply-chain/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-supply-chain`](skills/supply-chain/offensive-supply-chain/SKILL.md) | Software supply chain — SLSA provenance, Sigstore/Cosign artifact signing, lockfile integrity & CycloneDX/SPDX SBOMs |
| [`offensive-dependency-confusion`](skills/supply-chain/offensive-dependency-confusion/SKILL.md) | Dependency confusion — private npm/PyPI/Maven/NuGet/Cargo namespace scoping & upstream proxy routing |

### Social Engineering & Email Auth

`skills/social-engineering/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-phishing`](skills/social-engineering/offensive-phishing/SKILL.md) | Email authentication & FIDO2 — SPF `-all`, DKIM, DMARC `p=reject`, lookalike domain monitoring & WebAuthn passkeys |
| [`offensive-social-engineering`](skills/social-engineering/offensive-social-engineering/SKILL.md) | Identity verification workflows — helpdesk MFA reset approval gates, out-of-band callbacks & physical access controls |

### Network Attacks

`skills/network/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-network-attacks`](skills/network/offensive-network-attacks/SKILL.md) | Layer 2/3 network hardening — Dynamic ARP Inspection (DAI), DHCP Snooping, 802.1X, LLMNR/NBT-NS disablement & VLANs |

### AI Security

`skills/ai/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-ai-security`](skills/ai/offensive-ai-security/SKILL.md) | AI/LLM security (OWASP LLM Top 10) — prompt injection defenses, tool-call sandboxing, RAG ACLs & output encoding |

### Utility

`skills/utility/` &bull; `.agents/skills/`

| Skill | Description |
|---|---|
| [`offensive-fast-checking`](skills/utility/offensive-fast-checking/SKILL.md) | Rapid 15-minute security triage checklist across auth, headers, secrets, dependencies, APIs & binary mitigations |
| [`offensive-reporting`](skills/utility/offensive-reporting/SKILL.md) | Professional security report writing — risk-led executive summaries, CVSS v3.1/v4.0 vectors, CWEs & remediation code |

---

## Supported Platforms & MCP Configuration

| AI Agent / Runtime | Configuration Files | Format | Loading Mode |
|---|---|---|---|
| <img src="assets/logos/direct/google-antigravity.svg" width="18" height="18" align="absmiddle" /> **Google Antigravity** | `.agents/skills/*/SKILL.md` | Agent Skills YAML + Markdown | Progressive on-demand discovery |
| <img src="assets/logos/direct/claude.svg" width="18" height="18" align="absmiddle" /> **Claude Code / Claude.ai** | `.claude-plugin/plugin.json` & `CLAUDE.md` | Native Plugin + `@AGENTS.md` | 1-click plugin & root instruction |
| <img src="assets/logos/direct/codex.svg" width="18" height="18" align="absmiddle" /> **OpenAI Codex** | `AGENTS.md` & `agents/openai.yaml` | Dual-harness YAML + Markdown | Skill picker UI + persistent rules |
| <img src="assets/logos/direct/cursor.svg" width="18" height="18" align="absmiddle" /> **Cursor IDE** | `.cursor/rules/*.mdc` | Cursor MDC frontmatter | `alwaysApply: true` workspace rules |
| <img src="assets/logos/direct/copilot.svg" width="18" height="18" align="absmiddle" /> **GitHub Copilot** | `.github/copilot-instructions.md` | Standard Markdown | Workspace context instructions |
| <img src="assets/logos/direct/jules.svg" width="18" height="18" align="absmiddle" /> **Google Jules** | `.agents/skills/*/SKILL.md` | Agent Skills Standard | Autonomous cloud coding agent |
| <img src="assets/logos/direct/kimi.svg" width="18" height="18" align="absmiddle" /> **Moonshot Kimi** | `AGENTS.md` | Standard Markdown | Long-context instruction |
| <img src="assets/logos/direct/openclaw.svg" width="18" height="18" align="absmiddle" /> **OpenClaw** | `skills/*/*/SKILL.md` | Agent Skills Standard | Open agent harness |
| <img src="assets/logos/direct/opencode.svg" width="18" height="18" align="absmiddle" /> **OpenCode** | `AGENTS.md` | OpenCode CLI format | Terminal coding agent |
| **Windsurf & Cline** | `.windsurf/rules/*.md` & `.clinerules/*.md` | Plain Markdown | Workspace task rules |

### Unified `.mcp.json`

```json
{
  "mcpServers": {
    "rea": { "command": "npx", "args": ["-y", "rea-agents@latest", "run"] },
    "playwright": { "command": "npx", "args": ["-y", "@playwright/mcp@latest"] },
    "brightdata": {
      "command": "npx",
      "args": ["-y", "@brightdata/mcp"],
      "env": { "BRIGHTDATA_API_KEY": "${BRIGHTDATA_API_KEY}" }
    },
    "hyperbrowser": {
      "command": "npx",
      "args": ["-y", "hyperbrowser-mcp"],
      "env": { "HYPERBROWSER_API_KEY": "${HYPERBROWSER_API_KEY}" }
    }
  }
}
```

---

## Roadmap

See [CHANGELOG.md](CHANGELOG.md) for release history and [MINDMAP.md](MINDMAP.md) for the full visual topology.

| Phase | Focus | Skills | Status |
|---|---|---:|---|
| 1 | REA Core — PE/ELF/Mach-O, APK/IPA, Web bundles, PCAP, SQLite, Game assets, Firmware & Crash triage | 12 | Complete |
| 2 | Multi-Agent Ecosystem — Owner auth, 10-layer web audit, ECC rigor, Agent Reach, SurfSense & Browser MCPs | 9 | Complete |
| 3 | Web, API, Auth & GraphQL Security Library (`claude-red` integration) | 20 | Complete |
| 4 | Wireless — 802.11, WPA2/3, 802.1X, WPS, BLE, Classic BT, Zigbee/Matter, Z-Wave & LoRaWAN | 14 | Complete |
| 5 | Binary Hardening, Crash Analysis, Exploit Mitigations & Coverage-Guided Fuzzing | 10 | Complete |
| 6 | Active Directory, Cloud, Containers/K8s, CI/CD, Crypto, PrivEsc, Forensics, Supply Chain & AI | 35 | Complete |
| 7 | Interactive Prompt Vault (500+ templates) & AI Prompt Builder Web App | — | Complete |
| 8 | Deep Kernel Driver & eBPF Runtime Verification Modules | +12 | Planned |
| 9 | Automated Binary Diffing & Patch-Gap Regression Suite | +10 | Planned |

Target: **120+ skills across 25+ categories**.

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for the `SKILL.md` template, `agents/openai.yaml` dual-harness metadata rules, and automated validation (`npm test`). See [SECURITY.md](SECURITY.md) for our security and responsible-use policy.

## License

[MIT](LICENSE) &copy; 2026 **Arafath Rahman** (`@smartworldarafath`).

## Acknowledgements

- **REA (Reverse Engineer Anything):** [morluto/rea](https://github.com/morluto/rea) — MCP server for binary, web, mobile, and runtime reverse engineering
- **claude-red Skill Taxonomy:** [SnailSploit/claude-red](https://github.com/SnailSploit/claude-red) (Kai Aizen) & [sahar042/offensive-checklist](https://github.com/sahar042/offensive-checklist)
- **Agent Skills Architecture:** [mattpocock/skills](https://github.com/mattpocock/skills) — plugin manifest, ADR, and `grill-me` patterns
- **Engineering Rigor & Research:** [Everything Claude Code](https://github.com/affaan-m/everything-claude-code), [Agent Reach](https://github.com/Panniantong/agent-reach), and [SurfSense](https://github.com/MODSetter/SurfSense)

---

<div align="center">

*Give your coding agent the right skill and it stops guessing — it becomes a reverse engineer and security architect.*

[Live Website & 500+ Prompts](https://smartworldarafath.github.io/REA_Skill/) &bull; [GitHub Repository](https://github.com/smartworldarafath/REA_Skill) &bull; [Visual Mindmap](MINDMAP.md) &bull; [Security Policy](SECURITY.md)

</div>
