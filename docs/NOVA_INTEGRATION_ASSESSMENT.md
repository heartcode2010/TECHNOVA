# Unified NOVA — Dark Obsydia integration assessment

## Source facts

The upstream Dark Obsydia README describes a self-hosted workspace with:
- Node.js 22, Express 5, TypeScript, React 19 and Vite
- MongoDB 7 / Mongoose
- Ollama serving Qwen models locally by default
- Optional OpenAI-compatible provider configuration
- Chat streaming, file attachments, project generation, code editor and sandboxed browser preview
- Email verification, sessions, teams, token plans, developer API and administration
- Docker Compose deployment with Caddy, health checks and backup/restore scripts
- Vitest and documented typecheck/test commands
- Apache License 2.0 with upstream LICENSE and NOTICE

The upstream README documents a local-development workflow using MongoDB and Ollama containers, `npm run dev`, `npm run typecheck` and `npm test`. It states its test suite includes integration tests against a real MongoDB instance. These claims must be independently rerun on the imported source before relying on them.

## TECHNOVA integration intent

Use the existing Dark Obsydia code as the implementation foundation for Unified NOVA. Do not replace it with a different chatbot or write a superficial mock. Keep upstream provenance and licence notices.

NOVA should become a shared intelligence service used by TECHNOVA modules through authenticated, scoped service interfaces. Module-specific tools must be permissioned and auditable. A user asking ScamShield for a URL assessment must not automatically grant NOVA access to private projects, billing controls, admin functions or another user's files.

## Integration work still required

1. Import the complete upstream source tree and all required manifests, lockfiles, Docker assets, scripts, docs, tests, screenshots and environment example files. Exclude real secrets, generated user data and live uploads.
2. Compare upstream dependency versions and runtime assumptions with the existing TECHNOVA repository before selecting the deployment topology.
3. Run dependency installation, typecheck, unit/integration tests and a local smoke test with disposable MongoDB/Ollama services.
4. Inspect auth/session boundaries, CSRF, CORS, CSP, file upload limits, archive handling, sandbox origin, project generation, admin authorization, billing/webhooks and provider-key encryption.
5. Configure NOVA's identity, welcome message and system prompt for TECHNOVA while preserving upstream functionality.
6. Define service-to-service authentication and a tool allowlist for each TECHNOVA module.
7. Decide model hosting from measured hardware and cost. The upstream default is local Ollama/Qwen; do not promise fast inference without capacity testing.
8. Configure SMTP and a verified model provider only with owner-supplied secrets stored server-side. Never commit secrets.
9. Deploy to staging, test tenant isolation and real user journeys, then request owner approval before production.

## Nigerian-first adaptation

- Make the user experience plain-language and mobile/low-bandwidth friendly.
- Support Nigerian English and local context while avoiding fabricated local facts.
- Show AI usage limits and cost clearly.
- Keep Naira pricing decisions separate from upstream USD token-plan defaults; validate pricing with users.
- Do not assume Stripe/PayPal in upstream code is suitable for Nigerian launch. Evaluate compliant local payment partners independently.
- Keep payment, custody, escrow and virtual-asset features disabled until legal/provider review.

## Current state

Only the upstream README, root package manifest, LICENSE and NOTICE are present in TECHNOVA's source snapshot. The complete Dark Obsydia runtime is not yet imported, configured, tested or deployed. No NOVA request can yet be described as live.
