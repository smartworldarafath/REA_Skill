---
name: website-security-audit
description: Use when the user requests a defensive security audit, vulnerability assessment, security headers check, or bundle leak analysis for their own website, web application, or web endpoints (e.g. Next.js, Supabase, Clerk, Vercel).
---

# Website Security Audit (Owner-Developer Defensive Assessment)

## Overview
This skill provides a standardized, automated methodology for performing defensive security audits and vulnerability assessments on websites and web applications owned by the user. It systematically identifies configuration oversights, sensitive token exposures, architectural weaknesses, and missing defensive controls before malicious actors can exploit them.

## When to Use
- When the user asks to "audit my website", "find vulnerabilities on my site", "check if my web app is secure", or tests a 2nd/3rd website.
- When inspecting production or staging web applications (Next.js, React, Vue, SvelteKit, Vercel, Cloudflare, etc.).
- When evaluating backend integrations such as Supabase, Firebase, Clerk, Stripe, or Paddle for misconfigurations.

---

## 5-Phase Audit Methodology

### Phase 1: HTTP Security Headers & Transport Security
Inspect response headers using curl or HTTP client:
```bash
curl.exe -I -s -L https://<target-domain>/
```

Evaluate against the defensive baseline:
1. **Strict-Transport-Security (HSTS):** Must include `max-age=31536000; includeSubDomains; preload`.
2. **Content-Security-Policy (CSP):**
   - Check if CSP is in `Content-Security-Policy-Report-Only` (non-blocking) instead of enforced `Content-Security-Policy`.
   - Check for dangerous directives: `'unsafe-inline'`, `'unsafe-eval'`, or overly broad wildcards (`*`).
   - Recommend migrating inline scripts to cryptographic nonces (`nonce-<base64>`).
3. **Cross-Origin Resource Sharing (CORS):**
   - Flag `Access-Control-Allow-Origin: *` on authenticated API endpoints or private resources.
4. **Clickjacking Defense:** Verify `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'` / `'self'`.
5. **MIME Sniffing:** Verify `X-Content-Type-Options: nosniff`.
6. **Referrer & Permissions:** Verify `Referrer-Policy: strict-origin-when-cross-origin` and restrictive `Permissions-Policy`.

---

### Phase 2: Frontend Bundle & Secret Leakage Inspection
Download the initial HTML and extract client-side JavaScript bundles to inspect for leaked secrets.

**Automated Python Inspection Routine:**
```python
import urllib.request, re

url = "https://<target-domain>/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
html = urllib.request.urlopen(req).read().decode("utf-8", errors="ignore")

# 1. Search for high-risk secret patterns
high_risk_patterns = {
    "Supabase Service Role Key": r"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+",
    "Private API Key / Secret": r"(?:sk_live_|secret_key|private_key|api_secret)\w+",
    "Database URL with Credentials": r"postgres://\w+:[^@]+@[\w\.-]+",
    "AWS Access Key": r"AKIA[0-9A-Z]{16}",
}

# 2. Extract discovered API routes
api_routes = set(re.findall(r'["\'](/api/[\w\-/]+)["\']', html))
```

**What is Safe vs Unsafe:**
- ✅ **Safe to expose:** Next.js `NEXT_PUBLIC_*`, Supabase `anon_key` (when RLS is active), Clerk publishable key (`pk_live_*`), Google Analytics IDs.
- ❌ **Critical Leaks:** Supabase `service_role_key`, Stripe/Paddle webhook secret keys, database passwords, internal backend URLs.

---

### Phase 3: Auth & Database Access Controls (RLS Verification)
When integrations like Supabase, Firebase, or Clerk are detected:
1. **Row Level Security (RLS):**
   - Public `anon_key` is meant to be client-accessible, BUT **all database tables must have RLS enabled**.
   - If RLS is disabled, anyone with the `anon_key` can dump or modify full database tables.
2. **Auth Token Flow:**
   - Verify JWT expiration, secure HttpOnly cookie storage, and session invalidation on logout.
3. **Multi-Tenant Data Isolation:**
   - Confirm RLS policies filter strictly by authenticated identity (e.g. `auth.uid() = user_id`).

---

### Phase 4: API Endpoint & Route Hardening
Examine all discovered `/api/*` routes:
1. **Authentication Enforcement:** Verify unauthenticated requests to private endpoints return `401 Unauthorized` or `403 Forbidden`.
2. **Rate Limiting & Anti-Abuse:**
   - Check if critical routes (login, registration, OTP send, checkout creation) have rate limiting (e.g. via Upstash Redis or Cloudflare WAF) to block credential stuffing and denial of wallet attacks.
3. **Input Validation:** Ensure endpoints use schema validation (Zod, Joi) to reject malformed payloads.

---

### Phase 5: Webhook & Payment Security
For e-commerce and SaaS platforms (Paddle, Stripe, LemonSqueezy):
1. **Webhook Signature Verification:** Ensure webhook endpoints cryptographically verify HMAC signatures before updating user plans or entitlements.
2. **Idempotency:** Verify webhooks handle duplicate delivery gracefully without double-crediting accounts.

---

## Deliverable Format for the User
When presenting findings to the user, always structure the report clearly:
1. **Executive Summary:** Quick health status of the target website.
2. **Critical & High Priority Findings:** Immediate security risks with clear explanation.
3. **Medium & Low Priority Hardening:** Configuration improvements (CSP, CORS, headers).
4. **Verified Strengths:** Positives already configured correctly (HSTS, safe assets).
5. **Concrete Action Plan:** Step-by-step code and config snippets the developer can copy-paste to fix each issue immediately.
