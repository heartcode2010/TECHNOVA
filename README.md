# TECHNOVA

**Learn. Protect. Build. Earn. Innovate.**

TECHNOVA is the Nigeria-first digital problem-solving ecosystem defined by the owner's **TECHNOVA Master Product Vision & Full Build Prompt** (21 November 2026).

## Protected source code — imported without rewriting

This repository pins two upstream codebases as Git submodules:

- `vendor/heartcode-original` → [heartcode2010/HEARTCODE](https://github.com/heartcode2010/HEARTCODE), commit `50946857a2d2a7e92052c995579a3f06e30dbf67`. This contains the existing Vulnerability Scanner and Cyber Academy.
- `vendor/dark-obsydia-ai` → [heartcode2010/dark-obsydia-ai](https://github.com/heartcode2010/dark-obsydia-ai), commit `cd74724f930170abf04d2eeb3f10ee56459c38ee`. This is the selected self-hosted AI workspace and coding-agent foundation.

The source repositories are not modified by TECHNOVA integration work. Their pinned revisions are intentional and must only be advanced after review. Dark Obsydia AI is Apache-2.0; preserve its LICENSE and NOTICE and comply with attribution and redistribution requirements.

### Clone with the actual source code

```bash
git clone --recurse-submodules https://github.com/heartcode2010/TECHNOVA.git
cd TECHNOVA
git submodule status
```

If already cloned:

```bash
git submodule update --init --recursive
```

A normal GitHub source ZIP does not automatically include submodule contents; clone with `--recurse-submodules` to obtain the pinned source code.

## Non-negotiable preservation rules

The HEARTCODE Vulnerability Scanner and Cyber Academy remain protected flagship products. Do not redesign, rewrite, refactor, relocate, rebrand, replace, merge, or alter their UI, routes, wording, styling, component hierarchy, scanning workflow, learning content, or existing behaviour. TECHNOVA services must be additive and isolated. If a change appears to require touching either protected product, stop and obtain explicit owner approval.

The original HEARTCODE repository remains the source of truth. No destructive changes are to be made there.

## Product execution

TECHNOVA is not a decorative mega-dashboard. The full product journey is:

**Discover → Diagnose → Learn → Practise → Prove → Match → Deliver → Transact → Grow.**

Every module must solve a defined user problem end-to-end, with real persistence, permission checks, loading/error/success states, monitoring, tests, mobile QA and rollback steps before it is called complete. Do not fabricate AI output, opportunities, verification, payment status, monitoring or scan results.

## Repository layout

- `docs/` — product blueprint, architecture decisions, audit and release evidence.
- `vendor/heartcode-original/` — pinned original HEARTCODE source (submodule).
- `vendor/dark-obsydia-ai/` — pinned Dark Obsydia AI source (submodule).
- `apps/` — TECHNOVA-owned user-facing applications.
- `packages/` — shared TECHNOVA-owned contracts and utilities.
- `services/` — TECHNOVA-owned backend modules and integrations.

## Nigeria-first requirements

Mobile-first Android experience, low-data and intermittent-connectivity support, NGN-first pricing, Nigerian phone formats and workflows, local opportunities and exam preparation, and compliant local payment-provider integrations. Pricing must be validated with real Nigerian users.

## Launch discipline

Follow the phased launch waves in `docs/PRODUCT_IMPLEMENTATION_ROADMAP.md`. Do not release every planned module as an unfinished shell. Do not claim production readiness without evidence from actual tests and end-to-end workflows.
