# TECHNOVA

**Learn. Protect. Build. Earn. Innovate.**

Nigeria-first digital problem-solving and opportunity ecosystem by Heartcode Technologies.

## Current implementation status

This repository is being built in release waves. The current branch contains the first React/Vite/TypeScript application shell and responsive Corporate Editorial interface for the first product areas. It is not yet production-ready or deployed.

### Implemented in the current UI foundation
- Responsive TECHNOVA shell and compact navigation.
- Overview pathways into Protect, FixIt, Opportunities, Portfolio and Business.
- Protect area distinguishes new TECHNOVA work from the original HEARTCODE Scanner and Cyber Academy, whose service integration is pending.
- FixIt intake draft UI (not yet account-backed or persisted).
- Opportunity Radar empty state (no fabricated live listings).
- Portfolio session drafts (not yet account-backed or persisted).
- Business Launchpad / SME Health Check status presentation.

### Not yet implemented or verified
- Authentication and connected database for this React app.
- Server-side ScamShield analysis, FixIt recommendations and saved cases.
- Verified live opportunity ingestion and moderation.
- Persistent portfolio and SME assessment workflows.
- Unified NOVA provider integration.
- Runtime deployment of HEARTCODE and Dark Obsydia services.
- Automated tests, production build verification and deployment.

## Protected upstream products

The original repositories are preserved as Git submodules. Do not alter protected Scanner or Academy source as part of TECHNOVA UI work.
- HEARTCODE: vendor/heartcode-original
- Dark Obsydia AI: vendor/dark-obsydia-ai

Clone with submodules enabled:

```bash
git clone --recurse-submodules https://github.com/heartcode2010/TECHNOVA.git
cd TECHNOVA
git checkout import/heartcode-scanner-academy
git submodule update --init --recursive
npm ci
npm run dev
```

## Commands
- npm run dev — local development
- npm run typecheck — TypeScript check
- npm run build — production build
- npm run preview — preview production output

## Deployment

A Netlify configuration is included. Deploy only after build and typecheck pass in a clean checkout. This configuration does not mean a Netlify site has been created or deployed.

## Product scope and governance

See docs/COMPLETE_PRODUCT_SCOPE.md, docs/PRODUCT_ARCHITECTURE.md, docs/DELIVERY_ROADMAP.md, docs/PROTECTED_PRODUCTS.md and docs/VERIFIED_SOURCE_LOCK.md. Planned features must remain labelled as planned until their complete user journey, security, persistence, tests and operations are verified.
