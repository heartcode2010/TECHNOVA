# TECHNOVA Mobile

Native React Native application for Android-first delivery, with iOS support from the same codebase.

## Stack
- Expo SDK 58 / React Native 0.88
- Expo Router file-based native navigation
- TypeScript
- Low-bandwidth-friendly, mobile-first UI

## Run locally
```bash
cd apps/mobile
npm install
npx expo install --fix
npx expo start
```

Use an Android development build for device testing. An Expo Go session is useful for early UI iteration but is not a release build.

## Current mobile foundation
- Native Home, Protect, Learn, Build and Earn tabs.
- Searchable catalogue for the TECHNOVA ecosystem and signature concepts.
- Dedicated service detail screens with honest implementation labels.
- Offline ScamShield first-pass checks for urgency, credential requests, upfront payment language and a few suspicious URL characteristics.
- Offline FixIt checklists for common phone, laptop and connectivity issues.
- Protected Scanner and Cyber Academy remain marked as original services; they are not replaced by native lookalikes.

## Important limitations
ScamShield is an offline indicator check, not a live threat-intelligence lookup or guarantee of safety. FixIt currently offers a small set of safe checklists, not account-backed case history or remote support. Neither currently syncs data to a server. Authentication, server persistence, verified opportunities, payments, NOVA and protected-service runtime integration remain future delivery work.

## Build
The GitHub Actions workflow checks Expo dependencies, Expo configuration, TypeScript and Android bundling, then attempts a native Android debug APK build. A signed production Android App Bundle and iOS archive require configured signing/build credentials. No store release is claimed.
