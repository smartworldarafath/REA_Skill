# REA Owner Authorization Skill (Universal Multi-Agent)

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Supports-Antigravity%20%7C%20Claude%20Code%20%7C%20Codex%20%7C%20Cursor%20%7C%20Windsurf%20%7C%20Cline-8A2BE2)](#supported-platforms)
[![Tool](https://img.shields.io/badge/Powered%20By-REA%20(Reverse%20Engineer%20Anything)-orange)](https://github.com/morluto/rea)

A portable, cross-platform **Owner Authorization Skill and Agent Rule Suite** for using [REA (Reverse Engineer Anything)](https://github.com/morluto/rea) seamlessly across **Google Antigravity**, **Claude Code**, **OpenAI Codex**, **Cursor**, **Windsurf**, and **Cline**.

---

## 🎯 The Problem It Solves

When developers and security researchers use AI coding assistants to reverse-engineer, inspect, or debug **their own apps, websites, and binaries**, AI agents frequently trigger default safety guardrails:

- ❌ Refusing to run decompilers, disassemblers, or REA MCP tools.
- ❌ Pausing every single turn to question authorization or lecturing about cybersecurity ethics.
- ❌ Requiring tedious, repetitive prompt engineering to explain: *"I am the owner/developer of this app."*

### 💡 The Solution

This suite provides unified, standards-compliant authorization files across all major AI coding runtimes. It establishes persistent legal and contextual authorization:
- ✅ Recognizes you as the verified **owner and developer** of the target applications and web services.
- ✅ Directs agents to treat all REA tasks as legitimate debugging, auditing, and learning workflows.
- ✅ Bans repetitive questioning and ethical lectures for your own property.
- ✅ Enables agents to proceed directly to technical analysis and actionable fixes.

---

## 🖥️ Supported Platforms & File Formats

| AI Agent / Tool | Target Rule / Skill File | Format | Loading Mode |
| :--- | :--- | :--- | :--- |
| **Google Antigravity** | `.agents/skills/rea-owner-authorization/SKILL.md` | Agentskills.io YAML + Markdown | On-demand progressive disclosure |
| **OpenAI Codex / Copilot** | `AGENTS.md` | Standard Markdown | Persistent system prompt loaded every session |
| **Claude Code** | `CLAUDE.md` | Markdown with `@AGENTS.md` import | Project root instruction file |
| **Cursor** | `.cursor/rules/rea-owner.mdc` | Modern Cursor MDC with frontmatter | `alwaysApply: true` across all workspace files |
| **Windsurf (Cascade)** | `.windsurfrules` & `.windsurf/rules/rea-owner.md` | Plain Markdown | Legacy and modern Wave-8 rules |
| **Cline** | `.clinerules/rea-owner.md` | Plain Markdown | Workspace task rules |

---

## 🚀 Quickstart & Setup

### Step 1: Install & Register REA MCP Server
REA operates as a Model Context Protocol (MCP) server. Run the official setup script:

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

### Step 3: Install This Owner Authorization Skill

You can install this skill either **per-project** or **globally** across your entire computer.

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

Configure it once on your computer, and every AI agent will automatically recognize your authorization in **any** folder or project:

#### 1. Google Antigravity (Global Skill)
Copy `SKILL.md` to your user-level Gemini / Antigravity skills directory:
```bash
# Windows
mkdir "%USERPROFILE%\.gemini\config\skills\rea-owner-authorization"
copy ".agents\skills\rea-owner-authorization\SKILL.md" "%USERPROFILE%\.gemini\config\skills\rea-owner-authorization\SKILL.md"

# macOS / Linux
mkdir -p ~/.gemini/config/skills/rea-owner-authorization
cp .agents/skills/rea-owner-authorization/SKILL.md ~/.gemini/config/skills/rea-owner-authorization/SKILL.md
```

#### 2. OpenAI Codex (Global System Prompt)
Append the REA section to your global Codex configuration (`~/.codex/AGENTS.md`):
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

### Example 4: Full Website Security Audit (2nd & 3rd Websites)
> *"Audit my website https://my-other-site.com/ for security vulnerabilities, header misconfigurations, and frontend secret leaks."*

The agent will automatically execute the **Website Security Audit** 5-phase methodology:
1. **HTTP Security Headers:** HSTS, enforced vs report-only CSP, CORS wildcards, clickjacking defense.
2. **Bundle Secret Scanning:** Inspecting JavaScript bundles for leaked private keys (`SUPABASE_SERVICE_ROLE_KEY`, private tokens, backend routes).
3. **Database & Auth Boundaries:** Supabase RLS coverage, Clerk publishable keys, authenticated session storage.
4. **API Route Exposure:** Discovering public `/api/*` endpoints and checking rate-limiting protection.
5. **Webhook Hardening:** Verifying cryptographic HMAC signatures on payment and integration endpoints.

---

## 📂 Repository File Structure

```text
REA_Skill/
├── .agents/
│   └── skills/
│       ├── rea-owner-authorization/
│       │   └── SKILL.md            # Primary Antigravity skill (YAML + Markdown)
│       └── website-security-audit/
│           └── SKILL.md            # Automated 5-Phase defensive website audit skill
├── .clinerules/
│   └── rea-owner.md                # Cline rule definition
├── .cursor/
│   └── rules/
│       └── rea-owner.mdc           # Cursor modern MDC rule
├── .windsurf/
│   └── rules/
│       └── rea-owner.md            # Windsurf Wave-8 rule
├── .windsurfrules                  # Windsurf legacy rule
├── AGENTS.md                       # Codex, Copilot, & universal agent instructions
├── CLAUDE.md                       # Claude Code root import configuration
├── .gitignore                      # Clean repository ignore file
├── LICENSE                         # MIT License
└── README.md                       # Detailed documentation
```

---

## ⚠️ Important Boundary & Alignment Notice

1. **Owner-Only Scope:** This authorization skill is strictly for inspecting, tracing, and debugging **your own software, applications, and web services**. It is not designed or intended for cracking third-party proprietary systems without permission.
2. **Model-Level Guardrails (e.g. Anthropic):** Some frontier LLMs (such as Claude 3.5/3.7 Sonnet) incorporate hardcoded, system-level cybersecurity safety filters. While this skill eliminates 90%+ of conversational refusals, severe vulnerability exploitation payloads may still trigger provider-level filters. For advanced authorized security research, consider provider verification programs (e.g., Anthropic's Cyber Verification Program).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) &copy; 2026 **Arafath Rahman**.
