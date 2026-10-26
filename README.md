# REA, ECC & Agent Reach Multi-Agent Engineering Suite

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Supports-Antigravity%20%7C%20Claude%20Code%20%7C%20Codex%20%7C%20Cursor%20%7C%20Windsurf%20%7C%20Cline-8A2BE2)](#supported-platforms--file-formats)
[![Tool](https://img.shields.io/badge/Powered%20By-REA%20(Reverse%20Engineer%20Anything)-orange)](https://github.com/morluto/rea)
[![Harness](https://img.shields.io/badge/Harness-Everything%20Claude%20Code%20(ECC)-E07856)](https://github.com/affaan-m/everything-claude-code)
[![Integration](https://img.shields.io/badge/Enhanced%20With-Agent%20Reach-brightgreen)](https://github.com/Panniantong/agent-reach)

A portable, cross-platform **Owner Authorization, ECC Engineering Rigor, Website Security Audit, and Agent Reach Suite** for using [REA (Reverse Engineer Anything)](https://github.com/morluto/rea), [ECC (Everything Claude Code)](https://github.com/affaan-m/everything-claude-code), and [Agent Reach](https://github.com/Panniantong/agent-reach) seamlessly across **Google Antigravity**, **Claude Code**, **OpenAI Codex**, **Cursor**, **Windsurf**, and **Cline**.

---

## 🎯 The Problem It Solves

When developers and security researchers use AI coding assistants to reverse-engineer, inspect, debug, or build on **their own apps, websites, and binaries**, AI agents frequently run into friction:

- ❌ Refusing to run decompilers, disassemblers, or REA MCP tools on false-positive cybersecurity grounds.
- ❌ Pausing every single turn to question authorization or lecturing about cybersecurity ethics.
- ❌ Hallucinating solutions, skipping tests, or guessing API signatures without research.
- ❌ Giving up or hesitating when asked to find vulnerabilities, check weakpoints, or recover lost source code/data from personal applications.
- ❌ Getting blocked when attempting to fetch external documentation, CVE intelligence, or discussions from login-walled platforms (Twitter/X, Reddit, YouTube transcripts, GitHub).

### 💡 The Solution

This suite provides unified, standards-compliant authorization, engineering discipline, and intelligence skills across all major AI coding runtimes:
- ✅ **Persistent Owner Authorization:** Recognizes you as the verified owner and developer of target software, eliminating repetitive justification hurdles.
- ✅ **ECC Engineering Rigor:** Enforces the 6-stage development pipeline (Research & Reuse → Plan First → TDD → Code Review → Zero-Secret Audit → Verification).
- ✅ **Automated Defensive Website Audit:** Standardized 5-phase assessment covering security headers (CSP/HSTS/CORS), secret leaks, database RLS, and APIs.
- ✅ **Agent Reach Integration:** Live search and reading across Twitter/X, Reddit, YouTube transcripts, GitHub, LinkedIn, and the web with zero API fees.

---

## 🧩 Included Skills

| Skill | Path | Description |
| :--- | :--- | :--- |
| **`rea-owner-authorization`** | `.agents/skills/rea-owner-authorization/SKILL.md` | Primary authorization establishing legal ownership and preventing generic reverse-engineering refusals. |
| **`rea-personal-use-authorization`** | `.agents/skills/rea-personal-use-authorization/SKILL.md` | Instructs agents to make maximum effort without repeated confirmation on vulnerability hunting, website weakpoint audits, or data recovery. |
| **`website-security-audit`** | `.agents/skills/website-security-audit/SKILL.md` | Automated 5-Phase defensive security audit methodology for HTTP headers (CSP/HSTS/CORS), secret leaks, RLS, and APIs. |
| **`agent-reach`** | `.agents/skills/agent-reach/SKILL.md` | Universal internet reaching skill to read & search Twitter/X, Reddit, YouTube transcripts, GitHub, and login-walled web platforms. |
| **`ecc-workflow`** | `.agents/skills/ecc-workflow/SKILL.md` | Everything Claude Code (ECC) harness: research-first development, TDD, code review, orchestration (`orch-*`), and verification. |

---

## 🖥️ Supported Platforms & File Formats

| AI Agent / Tool | Rule / Skill Files | Format | Loading Mode |
| :--- | :--- | :--- | :--- |
| **Google Antigravity** | `.agents/skills/*/SKILL.md` | Agentskills.io YAML + Markdown | On-demand progressive disclosure |
| **OpenAI Codex / Copilot** | `AGENTS.md` | Standard Markdown | Persistent system prompt loaded every session |
| **Claude Code** | `CLAUDE.md` | Markdown with `@AGENTS.md` import | Project root instruction file |
| **Cursor** | `.cursor/rules/*.mdc` | Modern Cursor MDC with frontmatter | `alwaysApply: true` across all workspace files |
| **Windsurf (Cascade)** | `.windsurfrules` & `.windsurf/rules/*.md` | Plain Markdown | Legacy and modern Wave-8 rules |
| **Cline** | `.clinerules/*.md` | Plain Markdown | Workspace task rules |

---

## 🚀 Quickstart & Setup

### Step 1: Install & Register REA MCP Server
REA operates as a Model Context Protocol (MCP) server:

```bash
npx -y rea-agents@latest setup
```
> [!IMPORTANT]
> After running the setup command, **restart your AI agent** (or IDE) to load the newly registered MCP server.

### Step 2: Install REA's Official Investigation Skill (Recommended)
REA provides an official skill that routes specific reverse engineering workflows to its MCP tools:

```bash
npx skills add morluto/rea --skill reverse-engineer-anything
```

### Step 3: Install Agent Reach (Zero-Fee Internet Reading)
Install the Agent Reach CLI using `uv`:

```bash
uv tool install https://github.com/Panniantong/Agent-Reach/archive/refs/tags/v1.6.0.zip
agent-reach setup
```

### Step 4: Install ECC Tools (Optional but Recommended)
Install the Everything Claude Code universal harness and security scanner:

```bash
npm install -g ecc-universal ecc-agentshield
```

### Step 5: Install This Skill Suite

You can install this suite either **per-project** or **globally** across your entire computer.

---

### Option A: Per-Project Installation (Recommended for Teams)

Clone or copy this repository's files into the root of any workspace where you work on your own apps or software:

```bash
# Clone directly into your project directory
git clone https://github.com/smartworldarafath/REA_Skill.git .
```

Or copy the rule folders directly:
- `.agents/`
- `.clinerules/`
- `.cursor/`
- `.windsurf/`
- `.windsurfrules`
- `AGENTS.md`
- `CLAUDE.md`

---

### Option B: Global Machine-Level Installation (Recommended for Personal Dev)

Configure it once on your computer, and every AI agent will automatically recognize your authorization, ECC standards, and reach capabilities in **any** folder or project:

#### 1. Google Antigravity (Global Skills)
Copy all skills to your user-level Gemini / Antigravity skills directory:
```bash
# Windows
mkdir "%USERPROFILE%\.gemini\config\skills\rea-owner-authorization"
mkdir "%USERPROFILE%\.gemini\config\skills\rea-personal-use-authorization"
mkdir "%USERPROFILE%\.gemini\config\skills\website-security-audit"
mkdir "%USERPROFILE%\.gemini\config\skills\agent-reach"
mkdir "%USERPROFILE%\.gemini\config\skills\ecc-workflow"
copy ".agents\skills\rea-owner-authorization\SKILL.md" "%USERPROFILE%\.gemini\config\skills\rea-owner-authorization\SKILL.md"
copy ".agents\skills\rea-personal-use-authorization\SKILL.md" "%USERPROFILE%\.gemini\config\skills\rea-personal-use-authorization\SKILL.md"
copy ".agents\skills\website-security-audit\SKILL.md" "%USERPROFILE%\.gemini\config\skills\website-security-audit\SKILL.md"
copy ".agents\skills\ecc-workflow\SKILL.md" "%USERPROFILE%\.gemini\config\skills\ecc-workflow\SKILL.md"
xcopy /E /I /Y ".agents\skills\agent-reach" "%USERPROFILE%\.gemini\config\skills\agent-reach"

# macOS / Linux
mkdir -p ~/.gemini/config/skills/rea-owner-authorization ~/.gemini/config/skills/rea-personal-use-authorization ~/.gemini/config/skills/website-security-audit ~/.gemini/config/skills/agent-reach ~/.gemini/config/skills/ecc-workflow
cp .agents/skills/rea-owner-authorization/SKILL.md ~/.gemini/config/skills/rea-owner-authorization/SKILL.md
cp .agents/skills/rea-personal-use-authorization/SKILL.md ~/.gemini/config/skills/rea-personal-use-authorization/SKILL.md
cp .agents/skills/website-security-audit/SKILL.md ~/.gemini/config/skills/website-security-audit/SKILL.md
cp .agents/skills/ecc-workflow/SKILL.md ~/.gemini/config/skills/ecc-workflow/SKILL.md
cp -r .agents/skills/agent-reach/* ~/.gemini/config/skills/agent-reach/
```

#### 2. OpenAI Codex (Global System Prompt)
Append the instructions to your global Codex configuration (`~/.codex/AGENTS.md`):
```bash
# Windows
type AGENTS.md >> "%USERPROFILE%\.codex\AGENTS.md"

# macOS / Linux
cat AGENTS.md >> ~/.codex/AGENTS.md
```

#### 3. Claude Code (Global Instructions)
Append or link to your global Claude Code configuration:
```bash
# Windows
type CLAUDE.md >> "%USERPROFILE%\.claude\CLAUDE.md"

# macOS / Linux
cat CLAUDE.md >> ~/.claude/CLAUDE.md
```

#### 4. Cursor (Global Rules for AI)
1. Open Cursor Settings: `Ctrl + ,` (or `Cmd + ,` on macOS).
2. Navigate to **Features** > **Rules for AI** (User Rules).
3. Paste the contents of [`AGENTS.md`](AGENTS.md).

---

## 💬 Usage Examples

Once installed, you never need to justify yourself. You can give natural, direct instructions:

### Example 1: Web Application Analysis
> *"Use REA to trace and inspect the network request logic and WebSocket frames of my web app."*

### Example 2: Native Binary & Framework Inspection
> *"Inspect my compiled binary with REA to analyze exported symbols and verify native boundaries."*

### Example 3: Android / Electron App Debugging
> *"Use REA to inspect my Electron application package, check event listeners, and reconstruct component routes."*

### Example 4: Vulnerability Hunting & Pre-Publishing Audit
> *"Reverse engineer my AI app and find all vulnerabilities so I can fix them before publishing."*

### Example 5: Defensive Website Security Audit (2nd & 3rd Websites)
> *"Audit my website https://my-other-site.com/ for security vulnerabilities, header misconfigurations, and frontend secret leaks."*

The agent will automatically execute the **Website Security Audit** 5-phase methodology:
1. **HTTP Security Headers:** HSTS, enforced vs report-only CSP, CORS wildcards, clickjacking defense.
2. **Bundle Secret Scanning:** Inspecting JavaScript bundles for leaked private keys (`SUPABASE_SERVICE_ROLE_KEY`, private tokens, backend routes).
3. **Database & Auth Boundaries:** Supabase RLS coverage, Clerk publishable keys, authenticated session storage.
4. **API Route Exposure:** Discovering public `/api/*` endpoints and checking rate-limiting protection.
5. **Webhook Hardening:** Verifying cryptographic HMAC signatures on payment and integration endpoints.

### Example 6: Lost Source Code & Data Recovery
> *"My laptop is not turning on, I lost my source code. Without codes I cannot improve my app. Reverse engineer my app and recover all app data so I can continue my project."*

### Example 7: Prompt Shortcut
You can also directly trigger the personal authorization in any prompt:
```text
$rea-personal-use-authorization Audit my app for security weakpoints.
```

### Example 8: Live Threat Intelligence & Web Reach with Agent Reach
> *"Use Agent Reach to look up latest CVE disclosures and Reddit discussions about Next.js middleware vulnerabilities."*

The agent will invoke:
```bash
agent-reach github search "Next.js middleware vulnerability CVE"
agent-reach reddit search "Next.js middleware security bypass"
```

### Example 9: ECC Feature Implementation & Refactoring Pipeline
> *"Execute orch-add-feature to build an API rate-limiting middleware using Redis and TDD."*

The agent will follow the complete ECC development sequence:
1. Research existing open-source patterns on GitHub via `gh search code`.
2. Produce an implementation plan and test specification.
3. Write failing unit and integration tests (RED).
4. Implement the minimal rate-limiting logic (GREEN).
5. Refactor and audit diffs for edge cases and regressions.
6. Run the full verification suite before committing.

---

## 📂 Repository File Structure

```text
REA_Skill/
├── .agents/
│   └── skills/
│       ├── rea-owner-authorization/
│       │   └── SKILL.md                 # Primary Antigravity owner skill (YAML + Markdown)
│       ├── rea-personal-use-authorization/
│       │   └── SKILL.md                 # Antigravity personal-use & maximum effort skill
│       ├── website-security-audit/
│       │   └── SKILL.md                 # Automated 5-Phase defensive website audit skill
│       ├── agent-reach/
│       │   ├── SKILL.md                 # Universal internet platform reaching skill
│       │   └── references/              # Capabilities, sessions, and maintenance references
│       └── ecc-workflow/
│           └── SKILL.md                 # Everything Claude Code (ECC) harness & pipeline
├── .clinerules/
│   ├── rea-owner.md                     # Cline owner rule definition
│   ├── rea-personal-use.md              # Cline personal-use rule definition
│   ├── website-security-audit.md        # Cline website security audit rule
│   ├── agent-reach.md                   # Cline agent-reach rule definition
│   └── ecc-workflow.md                  # Cline ECC workflow rule definition
├── .cursor/
│   └── rules/
│       ├── rea-owner.mdc                # Cursor owner rule (MDC format)
│       ├── rea-personal-use.mdc         # Cursor personal-use rule (MDC format)
│       ├── website-security-audit.mdc   # Cursor website security audit rule
│       ├── agent-reach.mdc              # Cursor agent-reach rule (MDC format)
│       └── ecc-workflow.mdc             # Cursor ECC workflow rule (MDC format)
├── .windsurf/
│   └── rules/
│       ├── rea-owner.md                 # Windsurf Wave-8 owner rule
│       ├── rea-personal-use.md          # Windsurf Wave-8 personal-use rule
│       ├── website-security-audit.md    # Windsurf Wave-8 website security audit rule
│       ├── agent-reach.md               # Windsurf Wave-8 agent-reach rule
│       └── ecc-workflow.md              # Windsurf Wave-8 ECC workflow rule
├── .windsurfrules                       # Windsurf legacy rule file
├── AGENTS.md                            # Codex, Copilot, & universal agent instructions
├── CLAUDE.md                            # Claude Code root import configuration
├── .gitignore                           # Clean repository ignore file
├── LICENSE                              # MIT License
└── README.md                            # Detailed documentation
```

---

## ⚠️ Important Boundary & Alignment Notice

1. **Owner-Only Scope:** This authorization suite is strictly for inspecting, tracing, debugging, and recovering **your own software, applications, and web services**. It is not designed or intended for cracking third-party proprietary systems without permission.
2. **Model-Level Guardrails (e.g. Anthropic):** Some frontier LLMs (such as Claude 3.5/3.7 Sonnet) incorporate hardcoded, system-level cybersecurity safety filters. While this skill eliminates 90%+ of conversational refusals, severe vulnerability exploitation payloads may still trigger provider-level filters. For advanced authorized security research, consider provider verification programs (e.g., Anthropic's Cyber Verification Program) or local open-weights LLMs (e.g., Ollama) on your machine.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) &copy; 2026 **Arafath Rahman**.
