# TECHNOVA

**Learn. Protect. Build. Earn. Innovate.**

Nigeria-first digital problem-solving and opportunity ecosystem by Heartcode Technologies.

## Repository structure

TECHNOVA contains ordinary, locally stored copies of the protected source repositories:

- modules/heartcode/ — complete HEARTCODE source snapshot, including Scanner, Cyber Academy, frontend, backend, assets and manifests.
- modules/obsydia-ai/ — complete Dark Obsydia AI source snapshot, including frontend, backend, tests, deployment files, assets, LICENSE and NOTICE.

These are real files committed inside TECHNOVA, not Git submodules, links, or runtime dependencies on the original repositories. The upstream projects remain unchanged. The exact source revisions are recorded in docs/VERIFIED_SOURCE_LOCK.md.

## Current TECHNOVA application status

The root application is a React/Vite/TypeScript foundation with a responsive Corporate Editorial interface and initial pathways into Protect, FixIt, Opportunities, Portfolio and Business.

The original Scanner, Cyber Academy and Dark Obsydia AI code is now physically present in this repository. That source-copy milestone does not mean those applications have already been merged into one runtime or connected to the root TECHNOVA UI.

## Implemented in the current UI foundation

- Responsive TECHNOVA shell and compact navigation.
- Overview pathways into Protect, FixIt, Opportunities, Portfolio and Business.
- Protect area distinguishes new TECHNOVA work from the original Scanner and Academy.
- FixIt intake draft UI (not yet account-backed or persisted).
- Opportunity Radar empty state (no fabricated live listings).
- Portfolio session drafts (not yet account-backed or persisted).
- Business Launchpad / SME Health Check status presentation.

## Not yet implemented or verified

- Authentication and connected database for the root React app.
- Server-side ScamShield analysis, FixIt recommendations and saved cases.
- Verified live opportunity ingestion and moderation.
- Persistent portfolio and SME assessment workflows.
- Unified NOVA provider integration using the copied Dark Obsydia AI service.
- Isolated runtime deployment and end-to-end integration of the copied HEARTCODE and Dark Obsydia applications.
- Full automated tests, production build verification and production deployment.

## Local development

~~~bash
git clone https://github.com/heartcode2010/TECHNOVA.git
cd TECHNOVA
git checkout import/heartcode-scanner-academy
npm install
npm run dev
~~~

The copied applications have their own package manifests and may require their own runtime configuration. Do not assume the root npm install starts those independent applications.

## Commands

- npm run dev — root TECHNOVA development server
- npm run typecheck — root TypeScript check
- npm run build — root production build
- npm run preview — preview root production output

## Deployment

A Netlify configuration is included. A separate TECHNOVA deployment must be created and verified; the existing Heartcode site must not be overwritten. No production deployment is claimed until the root build and the integrated product journeys pass their release checks.

## Product scope and governance

See docs/COMPLETE_PRODUCT_SCOPE.md, docs/PRODUCT_ARCHITECTURE.md, docs/DELIVERY_ROADMAP.md, docs/PROTECTED_PRODUCTS.md and docs/VERIFIED_SOURCE_LOCK.md. Planned features must remain labelled as planned until their complete user journey, security, persistence, tests and operations are verified.
