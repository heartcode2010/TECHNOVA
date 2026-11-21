# TECHNOVA product architecture

**Product:** TECHNOVA  
**Positioning:** Nigeria-first digital problem-solving ecosystem  
**Promise:** Learn. Protect. Build. Earn. Innovate.

This document operationalises the TECHNOVA Master Product Vision and Build Specification (v1.0, 21 November 2026). It is a working architecture baseline, not a claim that integrations are already implemented.

## Product principles

1. Build connected outcomes, not a menu of disconnected tools.
2. Mobile-first, Android-conscious, low-bandwidth and accessible.
3. Naira-first pricing and Nigeria-relevant workflows.
4. Evidence-based trust: never fabricate scans, opportunities, verification, AI results or payment states.
5. Keep specialist services independently useful and modular.
6. Keep user data private; enforce permissions server-side.
7. No feature is launch-ready until its real journey, persistence, error states, tests, monitoring, support and rollback are present.

## Protected products

The existing Vulnerability Scanner and Cyber Academy are immutable integration boundaries. Their UI, colours, layout, typography, spacing, wording, routes, components and current behaviour must remain unchanged. Import their original source as preserved snapshots, record provenance and checksums, and integrate through additive adapters or independent routes only. If that cannot be achieved without touching protected code, stop and request owner approval.

## Platform layers

- **Experience layer:** TECHNOVA One shell, navigation, search, notifications, account settings and responsive design system for new modules.
- **Identity and access:** account identity, sessions, roles, organisations, consent, MFA-ready administration and service entitlements.
- **NOVA intelligence:** Unified NOVA powered by the existing Dark Obsydia AI codebase. Provider/model configuration, retrieval, tool permissions, usage metering, audit logs and safety boundaries remain server-side.
- **Specialist services:** ScamShield, FixIt, Opportunity Radar, Portfolio, Business Launchpad, Build-to-Launch, TechLabs, Arena, learning services and later expansion modules.
- **Data layer:** isolated domain models, validated schemas, migrations, audit events and retention controls.
- **Integration layer:** approved payment providers, Git providers, hosting, messaging, threat intelligence and other external APIs.
- **Operations:** admin controls, observability, abuse handling, backups, incident response and rollback.

## Domain boundaries

Each service owns its domain data and API contract. Shared identity, notification, audit and billing capabilities are platform services; avoid coupling every module to a single giant database schema. Begin with a modular monolith unless the source audit proves a separate service is necessary.

## NOVA integration rules

- Preserve Dark Obsydia upstream code and its Apache 2.0 LICENSE/NOTICE.
- Audit package manifests, runtime, model-provider assumptions, auth, database access, uploads, code execution and admin functions before enabling it.
- Integrate through a clearly bounded NOVA service/adapter; do not silently replace its model or fake responses.
- Enforce per-user authorization, prompt-injection defenses, tool allowlists, rate limits, budgets and cross-tenant isolation.
- Never expose provider keys or privileged tools in browser code.
- Label AI-generated material and make it reviewable.

## Data and transaction integrity

- Validate all input on the server.
- Treat uploaded files, URLs, code execution and user-generated content as hostile.
- Payment confirmation requires verified provider webhooks, signature validation, idempotency and reconciliation.
- A displayed ledger is not proof that funds are held by TECHNOVA.
- Do not store passwords, OTPs, PINs, seed phrases or full card details in support workflows.
- Keep personal identity data off public blockchains; use verifiable credentials only after privacy and legal review.

## Release sequence

1. Foundation: audit, backups, protected boundaries, authentication/roles, logging, deployment and design tokens for new modules.
2. Wave 1: ScamShield beta, FixIt guided support, manually verified Opportunity Radar, Portfolio core, Business Launchpad MVP and TECHNOVA One shell.
3. Wave 2: Build-to-Launch, TechLabs, Arena and Community Projects.
4. Wave 3: Freelance Exchange, MicroWorks, resource library and compliant milestone workflows.
5. Wave 4: QuizVerse/EduVerse, Campus, Cyber Range and Skill-to-Income.
6. Expansion: Website Guardian, Pulse, TrustCheck, PriceWatch, NetPulse, PowerPulse, API Hub, Nexora, Web3 Forge and remaining portfolio.

## Nigeria-first operational requirements

Test common Android devices and slower networks. Support Nigerian phone formats and Naira defaults. Verify local provider availability, legal requirements and pricing before launch. Do not assume payment, custody, escrow, lending, investment or virtual-asset permissions.
