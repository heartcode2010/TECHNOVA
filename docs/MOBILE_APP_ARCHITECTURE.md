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
1. Complete and verify the native Android APK build; run device QA on representative Android phones and constrained networks.
2. Configure and deploy the identity API, MongoDB user with least privilege, JWT secret, email sender domain and API URL; add MFA, session management, audit events and integration tests.
3. Add persistent FixIt cases and ScamShield evidence history, then integrate live reputation/threat-intelligence sources with clear uncertainty.
4. Opportunity Radar with verified sources, editorial review, deadlines and application tracking.
5. Portfolio and Business Launchpad persistence, document export and business records.
6. Integrate the protected Scanner and Cyber Academy through an externally secured gateway and regression tests; do not expose the current HEARTCODE backend directly.
7. Integrate the complete Dark Obsydia AI runtime as NOVA with scoped user identity, model metering, prompt-injection controls and private-data isolation.
8. Build remaining product modules in the release waves from the master product brief.

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
The native mobile foundation and separate identity API scaffold are in active development on `mobile/technova-native`. Expo Doctor, TypeScript and Android JavaScript bundle export have passed on the current mobile CI run; the native Gradle debug APK build is still being verified. The identity API code typecheck/build passes but is not deployed or configured with production credentials. The complete TECHNOVA product is not yet finished or released.
