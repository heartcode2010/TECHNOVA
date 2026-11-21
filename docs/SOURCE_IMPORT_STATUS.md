# Source import status

Updated: 21 November 2026

## Destination

- Repository: https://github.com/heartcode2010/TECHNOVA
- Branch: main

## HEARTCODE protected product snapshot

The following four upstream source files have been copied byte-for-byte into `source-snapshots/heartcode/`:

| Upstream path | Snapshot path |
|---|---|
| `frontend/src/components/Scanner/index.tsx` | `source-snapshots/heartcode/frontend/src/components/Scanner/index.tsx` |
| `frontend/src/pages/academy/AcademyLanding.tsx` | `source-snapshots/heartcode/frontend/src/pages/academy/AcademyLanding.tsx` |
| `backend/src/services/ScanService.ts` | `source-snapshots/heartcode/backend/src/services/ScanService.ts` |
| `backend/src/services/AcademyService.ts` | `source-snapshots/heartcode/backend/src/services/AcademyService.ts` |

These are entry points, not a complete runnable import. Their transitive components, hooks, stores, routes, assets, backend services, schemas, configuration and dependencies still need to be inventoried and copied before either protected product can be built from this snapshot. No claim of functional integration or regression success is made.

Original source repository: https://github.com/heartcode2010/HEARTCODE

## Dark Obsydia source snapshot

The following files have been copied into `source-snapshots/dark-obsydia/`:

- `README.md`
- `LICENSE`
- `NOTICE`
- `package.json`

Original source repository: https://github.com/heartcode2010/dark-obsydia-ai

The upstream README and root manifest are reference material only at this stage. This is not a complete import of the 181-file upstream repository, nor a configured or running NOVA integration. Preserve Apache 2.0 attribution and notices. Audit all package manifests, scripts, runtime assumptions, auth, storage, database, model provider, file handling, code execution and security controls before enabling it.

## Important limitations

- The original HEARTCODE repository has not been modified by this import.
- No complete dependency closure has been imported yet.
- No scanner or Academy regression suite has been run against TECHNOVA.
- No Dark Obsydia runtime or model connection has been configured.
- No production deployment or user-facing feature is claimed complete.
