# TECHNOVA

**Learn. Protect. Build. Earn. Innovate.**

TECHNOVA is the Nigeria-first digital problem-solving ecosystem defined in the Master Product Vision & Build Specification.

## Source preservation

The original HEARTCODE Vulnerability Scanner and Cyber Academy are protected products. Their source is being imported into this repository as preserved source snapshots. The original `heartcode2010/HEARTCODE` repository remains the source of truth and will not be modified by this work.

Dark Obsydia AI is the selected AI workspace/agent foundation. Its upstream source and Apache-2.0 license/NOTICE must be retained. TECHNOVA-specific integration must be additive and documented.

## Product execution

The full product is not a single dashboard or a collection of decorative screens. Each module must deliver a real user outcome, persist data where appropriate, enforce permissions, handle failures, and have tests before it is described as production-ready.

The product specification's launch sequence and protected-product rules govern implementation. Begin with an audit, baseline, source import, and foundation; then deliver complete user journeys in deliberate waves.

## Repository layout

- `docs/` — product specification, architecture decisions, audit and release evidence.
- `vendor/heartcode-original/` — preserved original HEARTCODE source snapshot.
- `vendor/dark-obsydia-ai/` — Dark Obsydia AI source snapshot and upstream license notices.
- `apps/` — TECHNOVA-owned product applications.
- `packages/` — shared TECHNOVA-owned contracts and utilities.
- `services/` — TECHNOVA-owned backend modules and integrations.

No claim of production readiness should be made without verified tests, configured dependencies, and successful end-to-end workflows.
