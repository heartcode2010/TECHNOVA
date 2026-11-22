# TECHNOVA

**Learn. Protect. Build. Earn. Innovate.**

TECHNOVA is a Nigeria-first digital problem-solving ecosystem by Heartcode Technologies. Its primary product is a native mobile application, Android-first, with iOS support.

## Primary product: native mobile app

The active mobile application lives in `apps/mobile/` and uses Expo SDK 58, React Native 0.88, Expo Router and TypeScript.

```bash
cd apps/mobile
npm install
npx expo install --fix
npx expo start
```

See [Mobile app architecture](docs/MOBILE_APP_ARCHITECTURE.md) and [mobile README](apps/mobile/README.md).

The root React/Vite app is a legacy web foundation/prototype. It is not the primary product and must not be treated as the finished TECHNOVA app or as a substitute for the native mobile client.

## Preserved source repositories

TECHNOVA contains ordinary, locally stored copies of the protected source repositories:

- `modules/heartcode/` — complete HEARTCODE source snapshot, including Scanner, Cyber Academy, frontend, backend, assets and manifests.
- `modules/obsydia-ai/` — complete Dark Obsydia AI source snapshot, including frontend, backend, tests, deployment files, assets, LICENSE and NOTICE.

These are actual files committed inside TECHNOVA, not Git submodules, links, or runtime dependencies on the original repositories. The upstream projects remain unchanged. Exact source revisions are recorded in `docs/VERIFIED_SOURCE_LOCK.md`.

## Product scope and delivery discipline

The mobile app is the unified entry point, not a reason to rewrite the protected products. The Scanner and Cyber Academy must retain their existing UI and behaviour. Dark Obsydia AI is the intended NOVA intelligence service and must be integrated through a secured server-side adapter.

The complete product scope is recorded in `docs/COMPLETE_PRODUCT_SCOPE.md`. Release in complete, testable user journeys—not decorative screens. Planned services must remain labelled as planned until their backend, persistence, security, operational support and mobile QA are verified.

## Current status

The native mobile foundation currently contains the app navigation, design tokens, module catalogue and service status/detail screens. It does not yet provide authentication, production APIs, database persistence, live ScamShield analysis, verified live opportunities, payments, or the integrated HEARTCODE/Dark Obsydia runtime. No signed app build or store release is claimed.

The source-copy branch and mobile work are separate. The active mobile branch is `mobile/technova-native`.
