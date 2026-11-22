# Verified copied source revisions

Checked 22 November 2026.

TECHNOVA branch: import/heartcode-scanner-academy

Both source repositories are stored as ordinary files inside this TECHNOVA repository. There is no .gitmodules file and no Git submodule pointer.

| TECHNOVA path | Upstream repository | Exact source commit | Files copied |
|---|---|---|---:|
| modules/heartcode/ | https://github.com/heartcode2010/HEARTCODE | 50946857a2d2a7e92052c995579a3f06e30dbf67 | 246 |
| modules/obsydia-ai/ | https://github.com/heartcode2010/dark-obsydia-ai | cd74724f930170abf04d2eeb3f10ee56459c38ee | 181 |

## Verification

The TECHNOVA Git tree was checked after the copy workflow completed:
- 246 ordinary file entries exist under modules/heartcode/.
- 181 ordinary file entries exist under modules/obsydia-ai/.
- No Git submodule entries remain.
- .gitmodules is absent.
- The source copy includes original frontend/backend source, package manifests, lockfiles, static assets and documentation. Dark Obsydia AI's LICENSE and NOTICE are present.

The copy workflow fetches the exact upstream commits, reads each complete source tree into its own TECHNOVA path, commits the ordinary files, and pushes the result to this branch. It does not edit either upstream repository.

## Important distinction

This completes the repository-level source copy. It does not mean both applications have been merged into one installable root package, connected to the TECHNOVA authentication/data layer, configured with production secrets, or deployed as running services.

## Integration rules

1. Preserve the copied Scanner and Cyber Academy files exactly. Do not redesign, refactor, relocate or rewrite them.
2. Keep runtime adapters and TECHNOVA-specific integration code outside the protected source snapshots.
3. Integrate Dark Obsydia AI as the intended NOVA foundation through explicit, authenticated service boundaries.
4. Audit runtime versions, environment variables, authentication, file storage, billing, AI provider configuration, sandboxing and tenant isolation before exposing services.
5. Keep source refreshes pinned to reviewed commits and update this manifest when revisions change.
6. Do not claim successful integration or production readiness until end-to-end tests pass.
