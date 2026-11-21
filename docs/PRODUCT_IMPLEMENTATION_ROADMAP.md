# TECHNOVA product implementation roadmap

Source of truth: TECHNOVA Master Product Vision & Full Build Prompt, Version 1.0 (21 November 2026). This roadmap preserves its scope and launch sequence. It is a plan, not a claim that features are already implemented.

## Product model

TECHNOVA One is one coherent experience: one account and identity, permissioned profile/portfolio, unified search and notifications, and a connected set of specialist services. Modules remain independently useful. The core outcome loop is:

1. Discover a real problem, opportunity or goal.
2. Diagnose with ScamShield, FixIt, TrustCheck or another appropriate service.
3. Learn through the protected Cyber Academy or other learning paths.
4. Practise in isolated labs, TechLabs, QuizVerse or Arena.
5. Prove skills with inspectable project evidence and credentials.
6. Match with a job, grant, challenge, client or community project.
7. Deliver work using Build-to-Launch, Business Launchpad or collaboration tools.
8. Transact through compliant providers with auditable ledger states.
9. Grow through feedback, reputation and further opportunities.

## Existing protected products

- **CyberVerse / Vulnerability Scanner:** preserve exact existing interface, routes, scan workflow, modules and behaviour. No redesign, refactor or replacement.
- **Cyber Academy:** preserve exact existing identity, content, interface, navigation and behaviour. Add only optional independent integrations through safe, additive boundaries.

Any required change to either protected product is a stop-and-ask dependency.

## Product portfolio in the specification

### Launch Wave 1 — complete user journeys
- TECHNOVA One shell and identity foundation.
- ScamShield: evidence-led checks for suspicious URLs, messages, payment requests and impersonation; Nigerian scam patterns; never request passwords, OTPs, PINs, seed phrases or full card details.
- FixIt: guided technical troubleshooting, safe steps, risk warnings, case history and verified technician referrals.
- Opportunity Radar: sourced, dated, eligibility-aware scholarships, grants, internships, hackathons, jobs and freelance calls; saved items and deadline/application tracking.
- Portfolio: shareable skills and project evidence with user-controlled privacy.
- Business Launchpad MVP: Naira-first invoices, receipts, inventory, sales, expenses and WhatsApp-ready catalogue workflows.

### Launch Wave 2 — create and collaborate
- Build-to-Launch: problem brief, user stories, architecture, implementation, testing and deployment workflow.
- TechLabs: isolated HTML/CSS/JavaScript practice, preview, autosave and source export.
- Arena: coding, cyber, logic, maths, design and business challenges with fair scoring and safe sandboxes.
- Community Projects: real problem statements, teams, tasks, milestones and evidence.

### Launch Wave 3 — paid work and exchange
- Freelance Exchange with scoped jobs, proposals, milestones, delivery evidence and dispute processes.
- MicroWorks for small paid tasks with quality checks.
- Digital Resource Library with creator rights and moderation.
- Trust/milestone workflows using licensed/compliant payment partners; do not hold funds unlawfully.

### Launch Wave 4 — education and institutions
- QuizVerse and EduVerse; Nigerian WAEC/JAMB-style CBT practice.
- Campus tools for schools and training centres.
- Cyber Range and Skill-to-Income pathways.
- Institution onboarding and role-based access.

### Expansion — validated demand first
- Website Guardian; TECHNOVA SOS / Digital Emergency Centre; Skill-to-Income Engine; AI Document Studio; Open Innovation Exchange; Local Tech Directory; TECHNOVA Pulse; TrustCheck; PriceWatch; NetPulse; PowerPulse; DeviceCare; LocalVoice; API Hub; Digital Vault; CivicTech Navigator; Nexora; BlockchainVerse / Web3 Forge.
- Signature concepts to evaluate: Local Problem Bounties, Proof-of-Work Passport, Trust Escrow for Digital Work, SME Digital Health Check, Opportunity-to-Application Copilot, Community Signal Network, Digital Skills-to-Contract Pathway and One-Click Business Presence.

## AI foundation — Dark Obsydia

Use the pinned Dark Obsydia AI project as the actual foundation, not a decorative assistant mock. Its existing stack includes React 19/Vite, Express 5/TypeScript, MongoDB/Mongoose, Ollama/Qwen local model support, provider management, streaming chat, file workflows, coding/project builder, sandboxed preview, billing, developer API, teams and admin functions.

Integration work must first map the real routes, data models, session/auth design, AI provider lifecycle, billing and storage boundaries. Preserve upstream LICENSE and NOTICE. TECHNOVA-specific tools must be added through explicit, validated server-side service contracts. Do not assume local model capacity or external provider credentials are configured.

## Web3 Forge / BlockchainVerse

Start with education and safe testnet workflows: blockchain foundations, wallet safety, Solidity, smart-contract testing, NFT/token exercises and DeFi risk education. Use simulated trading only when clearly labelled as simulation. EVM-first, Solana second is a proposed implementation sequence; do not issue a TECHNOVA token just for branding. Do not request seed phrases or private keys. Custody, transfers, stablecoins, payments, exchange and securities-like services require specialist Nigerian legal review and appropriately licensed providers.

## Cross-cutting requirements

- Authentication, optional MFA, secure sessions, role-based access and least privilege.
- Tenant isolation for schools, businesses and teams.
- Server-side validation, authorization, rate limits, audit trails and safe error handling.
- Versioned, reversible migrations with backups.
- Object storage with file validation, malware scanning where available, access controls and retention rules.
- Secrets only in secure environment/secret management, never client bundles or source control.
- Structured logs, metrics, health checks, alerts, staging, CI, documented rollback and support runbooks.
- AI output labelled and reviewable; reliable retrieval for current claims; no fabricated citations, jobs, grants, prices, vulnerabilities or payment status.
- Android/mobile-first, low bandwidth, offline-friendly reading/practice where feasible, Naira default, Nigerian phone formats and local workflows.
- Payment status only from verified server-side provider events; use signed webhooks, idempotency, reconciliation and clear separation of ledger balances from actual provider-held funds.
- Test accessibility, privacy, prompt-injection defence, abuse moderation and cross-tenant data boundaries.

## Definition of done

A module is not complete because a page renders. A real user must complete its core task; data must persist; permissions must be enforced; errors and edge cases handled; mobile behaviour tested; security/privacy reviewed; monitoring and support available; and tests documented. Missing credentials, legal approvals or provider access must be reported—not simulated.

## First 90 days (planning target, not a guarantee)

- Days 1–10: repository/deployment/database audit, backups, protected-path inventory, user research with Nigerian learners, freelancers, SMEs and schools, and validate payment/legal dependencies.
- Days 11–30: foundation and TECHNOVA One; ScamShield beta, FixIt guided support and manually verified Opportunity Radar.
- Days 31–60: Portfolio, Business Launchpad core, first Arena challenge, analytics and pricing experiments.
- Days 61–90: pilot a narrow Build-to-Launch or Freelance/MicroWorks flow; onboard selected schools/SMEs; measure repeat use and unit economics.
