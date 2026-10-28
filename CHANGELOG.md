# Changelog

All notable changes to **REA_Skill** are documented in this file.

## [2.0.0] - 2026-10-28

### Added
- **Full `claude-red` Integration (79 Security Assessment Skills across 23 Categories):** Integrated the complete categorized skill tree (`web`, `auth`, `active-directory`, `wireless`, `cloud`, `mobile`, `iot`, `infrastructure`, `exploit-dev`, `fuzzing`, `recon`, `api`, `container`, `cicd`, `crypto`, `privesc`, `post-exploitation`, `forensics`, `supply-chain`, `social-engineering`, `network`, `ai`, `utility`) alongside our **REA Core (12 skills)** and **Agent Ecosystem (9 skills)** — totaling **100 skills across 25 categories**.
- **Matt Pocock Agent Skills Standard & Claude Plugin Packaging:** Added `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.agents/invocation.md`, `.agents/adr/0001..0004`, and `agents/openai.yaml` descriptors for all 100 skills.
- **Interactive REA Grilling Protocol (`rea-grill-me` & `rea-grilling`):** Frontier-question scoping interview before complex reverse-engineering and security audit tasks.
- **CLI Installer & Manifest Tooling:** Added `install.sh`, `tools/build_manifest.py`, `claude-skills.json`, `MINDMAP.md`, `SECURITY.md`, and `CONTRIBUTING.md`.
- **Technical SEO & AI Discovery:** Added JSON-LD structured data, `docs/sitemap.xml`, `docs/robots.txt`, and `docs/llms.txt`.
