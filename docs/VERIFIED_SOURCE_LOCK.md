# Verified upstream source locks

Checked 22 November 2026.

TECHNOVA branch: `import/heartcode-scanner-academy`

The branch contains Git submodule entries in `.gitmodules`. These pin the complete upstream repositories at exact commits; they are not partial hand-copied source directories.

| TECHNOVA path | Upstream repository | Pinned commit | Verification |
|---|---|---|---|
| `vendor/heartcode-original` | `https://github.com/heartcode2010/HEARTCODE.git` | `50946857a2d2a7e92052c995579a3f06e30dbf67` | Matches HEARTCODE `main` at verification time |
| `vendor/dark-obsydia-ai` | `https://github.com/heartcode2010/dark-obsydia-ai.git` | `cd74724f930170abf04d2eeb3f10ee56459c38ee` | Matches dark-obsydia-ai `main` at verification time |

## What this means

- The complete HEARTCODE repository is pinned, including its existing Vulnerability Scanner and Cyber Academy source trees, assets, package manifests, and supporting backend/frontend code.
- The complete Dark Obsydia AI repository is pinned, including its frontend, backend, tests, deployment files, package manifests, LICENSE, and NOTICE.
- The original repositories are not modified by this TECHNOVA branch.
- The submodules must be checked out when cloning: `git clone --recurse-submodules https://github.com/heartcode2010/TECHNOVA.git`, then check out this branch and run `git submodule update --init --recursive`.

## Important distinction

The submodule pins preserve the exact full upstream source at the listed commits. They do not mean the source has been flattened into ordinary TECHNOVA files, combined into a single installable application, or deployed. Do not remove the submodule references or rewrite protected source files as part of integration.

## Remaining engineering work

1. Clone and initialise both submodules in the build environment.
2. Audit both projects' manifests, environment requirements, scripts, licences, security boundaries, and runtime compatibility.
3. Keep the scanner and Academy source immutable; expose them through isolated integration boundaries.
4. Integrate Dark Obsydia as the NOVA foundation using additive adapters and explicit authentication/tenant boundaries.
5. Implement TECHNOVA modules in release waves, with real persistence, permissions, validation, monitoring, tests, and mobile QA.
6. Configure a Netlify site connected to the TECHNOVA repository and deploy only after a reproducible build and test run.

No claim of a completed integrated application, successful end-to-end tests, or production deployment is made by this source-lock record.
