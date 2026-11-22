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

## Build
Configure an Expo Application Services (EAS) project and credentials before producing signed Android App Bundles or iOS archives. Never commit signing credentials or provider secrets.

## Current scope
This is the first native mobile foundation: navigation, mobile design tokens, module catalogue and transparent status/detail screens. It does not yet provide authentication, server persistence, live scam analysis, live opportunities, payments or the integrated original HEARTCODE/Dark Obsydia runtime. These are separate delivery workstreams.
