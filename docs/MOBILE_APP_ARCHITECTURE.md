# TECHNOVA mobile application architecture

## Product decision
TECHNOVA's primary client is a native mobile application, not a responsive website. Android is the first delivery target because the product is Nigeria-first; iOS is supported by the shared React Native codebase. The existing root React/Vite client is a legacy prototype and is not the primary product.

## Client foundation
- Expo SDK 58, React Native 0.88, Expo Router and TypeScript.
- Native tab navigation: Home, Protect, Learn, Build and Earn.
- Central module registry provides consistent discovery and honest release status.
- Shared visual tokens are used by new TECHNOVA screens only.
- The protected HEARTCODE Scanner and Cyber Academy remain separate applications/services and must be opened through additive, tested integration boundaries. Do not port or redesign their UI as part of the mobile shell.
- Dark Obsydia AI is the intended NOVA intelligence service. The mobile client must call a secured server-side adapter; it must never contain model provider credentials.

## Implemented mobile foundation
- Searchable ecosystem catalogue and individual module detail screens.
- Offline ScamShield first-pass indicator review with explicit uncertainty and secret-handling warnings.
- Offline FixIt checklists for selected common device/connectivity issues.
- Native back headers and safe-area handling for the main tabs and tools.
- Android CI checks and a debug APK artifact build attempt.

These foundations are not equivalent to a production release. The offline ScamShield check does not query live threat feeds, and FixIt does not yet persist support cases or dispatch technicians.

## Delivery boundaries
1. Complete and verify the native Android build; run device QA on representative Android phones and constrained networks.
2. Identity, session security, user profile and consent.
3. Backend API and MongoDB data ownership; tenant isolation and audit trail.
4. ScamShield and FixIt complete, account-backed workflows.
5. Opportunity Radar with editorial verification, sources and reminders.
6. Portfolio and Business Launchpad persistence.
7. Original Scanner and Cyber Academy service integration with protected-source regression tests.
8. Dark Obsydia AI/NOVA integration with scoped user identity, metering, prompt-injection controls and private-data isolation.
9. Remaining product modules delivered in the roadmap's release waves.

## Non-negotiable release gates
- Real end-to-end user task and persistent server-side state where required.
- Authentication and authorization enforced by the API.
- Loading, empty, success, retry and failure states.
- Low-bandwidth behaviour and Android-device QA.
- Privacy, abuse controls, logging, monitoring, backup and rollback.
- Automated unit, integration and end-to-end tests.
- Signed Android App Bundle and install test before public release.
- No claim of Play Store publication until review and listing are verified.

## Current status
The native mobile foundation is in active development on `mobile/technova-native`. The complete TECHNOVA product is not yet finished or released.
