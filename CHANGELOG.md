# Changelog

All notable changes to **REA_Skill** are documented in this file.

## [2.1.0] - 2026-10-28

### Added
- **Full PayloadsAllTheThings Integration (63 Payload Skills across 4 New Categories):** Integrated the complete [swisskyrepo/PayloadsAllTheThings](https://github.com/swisskyrepo/payloadsallthethings) library as structured `SKILL.md` files with operational workflows, full payload content, and REA MCP integration hooks.
  - `payloads-injection` (18 skills): SQL, XSS, XXE, SSRF, SSTI, Command, LDAP, NoSQL, GraphQL, XPath, XSLT, LaTeX, SAML, SSI, HPP, CSV, Prototype Pollution, Prompt Injection
  - `payloads-web` (29 skills): CORS, CRLF, CSRF, Open Redirect, LFI/RFI, Path Traversal, Deserialization, File Upload, Request Smuggling, Cache Deception, OAuth, JWT, IDOR, Race Conditions, WebSocket, CSS Injection, Clickjacking, Type Juggling, Mass Assignment, Dep Confusion, Account Takeover, Brute Force, Business Logic, API Key Leaks, CVE Exploits, Reverse Proxy, vHosts, Hidden Params, ORM Leak
  - `payloads-research` (15 skills): DOM Clobbering, Encoding, ReDoS, DNS Rebinding, Tabnabbing, XS-Leak, Headless Browser, CSPT, GWT, Ext Variable, Java RMI, Insecure Randomness, Mgmt Interface, SCM Exposure, Zip Slip
  - `payloads-resources` (1 skill): Pentest Methodology & Resources
- **Total: 163 skills across 29 categories** (up from 100 across 25)
- **Integration Script:** Added `scripts/integrate-payloads.mjs` for automated PATT skill generation
- **Updated `scripts/build-manifests.mjs`** with 4 new PATT categories
- **Updated `AGENTS.md`** with the full PATT integration directive
- **Updated `README.md`** with full PATT skill index (63 skills) and category table

### Changed
- Package version bumped to `2.1.0`
- Plugin description updated to reflect 163-skill suite
- Claude-skills.json regenerated with 29 categories and 163 skills

## [2.0.0] - 2026-10-28

### Added
- **Full `claude-red` Integration (79 Security Assessment Skills across 23 Categories):** Integrated the complete categorized skill tree (`web`, `auth`, `active-directory`, `wireless`, `cloud`, `mobile`, `iot`, `infrastructure`, `exploit-dev`, `fuzzing`, `recon`, `api`, `container`, `cicd`, `crypto`, `privesc`, `post-exploitation`, `forensics`, `supply-chain`, `social-engineering`, `network`, `ai`, `utility`) alongside our **REA Core (12 skills)** and **Agent Ecosystem (9 skills)** — totaling **100 skills across 25 categories**.
- **Matt Pocock Agent Skills Standard & Claude Plugin Packaging:** Added `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.agents/invocation.md`, `.agents/adr/0001..0004`, and `agents/openai.yaml` descriptors for all 100 skills.
- **Interactive REA Grilling Protocol (`rea-grill-me` & `rea-grilling`):** Frontier-question scoping interview before complex reverse-engineering and security audit tasks.
- **CLI Installer & Manifest Tooling:** Added `install.sh`, `tools/build_manifest.py`, `claude-skills.json`, `MINDMAP.md`, `SECURITY.md`, and `CONTRIBUTING.md`.
- **Technical SEO & AI Discovery:** Added JSON-LD structured data, `docs/sitemap.xml`, `docs/robots.txt`, and `docs/llms.txt`.
