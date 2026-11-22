# Source integration audit — HEARTCODE and Dark Obsydia AI

This is an initial manifest/code-path review, not a complete penetration test or production approval.

## HEARTCODE
- Repository snapshot: `modules/heartcode/`, upstream commit `50946857a2d2a7e92052c995579a3f06e30dbf67`.
- Structure: separate Vite/React frontend and Express 4/TypeScript backend.
- Backend data layer: MongoDB via Mongoose.
- Authentication routes include register, login, Google auth, refresh, logout and authenticated profile.
- Scanner analysis route is protected by `authenticateToken`; Academy tutor, scam analysis, curriculum and campaign routes also require authentication.
- The original frontend contains the Scanner and Academy screens and styles. Keep the whole original UI in its own runtime. A native app integration should use a secure WebView/service boundary rather than recreating or redesigning these screens.
- The repository's example environment file contains placeholder secrets and legacy model configuration. Do not reuse those values as production secrets or assume the example provider/model remains current.

## Dark Obsydia AI
- Repository snapshot: `modules/obsydia-ai/`, upstream commit `cd74724f930170abf04d2eeb3f10ee56459c38ee`.
- Structure: npm workspaces with Express 5 backend and React/Vite frontend; Node engine `>=20.11`.
- Backend uses MongoDB/Mongoose, signed JWT session cookies, database-backed sessions, CSRF protection, email verification, rate limits and user-scoped conversation queries.
- Chat routes require a verified account. Conversations and messages are queried with the authenticated user's ID.
- The service includes its own authentication, admin, billing, files, projects, preview and developer API surfaces. Do not expose admin or developer credentials in the mobile bundle.
- Docker Compose includes MongoDB 7, Ollama, the app and Caddy. The local Qwen/Ollama model requires server-side compute; it does not run inside the Android app.
- The example environment file leaves important secrets blank. Generate production secrets through a secure deployment process; never commit them.
- Its existing Stripe/PayPal billing must not be assumed suitable for the Nigerian TECHNOVA checkout. Evaluate supported local payment providers and legal/compliance requirements before enabling payments.

## Integration decision
Run the protected HEARTCODE frontend/backend and Dark Obsydia AI as isolated runtimes. Add a TECHNOVA API/gateway outside the copied source directories. The gateway will own mobile session policy, tenant boundaries, audit and provider adapters. Connect to each service server-to-server with scoped credentials; never place service secrets, model keys, database URLs or payment keys in the React Native app.

## Required next checks
- Install and test each original service in an isolated environment using generated secrets and disposable test data.
- Inspect all auth, upload, project preview/code-generation, admin and webhook paths before exposing them publicly.
- Verify MongoDB indexes, backups, restore and cross-user access tests.
- Establish a service identity and token/session exchange for native mobile use without weakening either service's existing authentication.
- Verify Scanner and Academy routes, screenshots and scan results before and after integration.
- Benchmark Ollama/Qwen memory, latency and cost on the selected server before enabling NOVA for public users.

## Critical HEARTCODE security blockers

The initial middleware review found a release-blocking issue in the preserved backend source:

- `modules/heartcode/backend/src/middleware/auth.middleware.ts`: `authenticateToken` assigns a hard-coded local operator with the admin role when the Authorization header is missing. It also falls back to that operator when a supplied token is invalid.
- In the same file, `requireRole` accepts a list of roles but does not check the authenticated user's role before calling `next()`.
- `modules/heartcode/backend/src/controllers/auth.controller.ts` and the middleware contain predictable fallback JWT secrets if production environment variables are absent.
- The auth controller also contains a hard-coded default administrator email if `ADMIN_EMAIL` is not configured.

**Do not expose the HEARTCODE backend directly to the public internet in this state.** The protected source has not been edited. Before any production integration, the deployment must isolate the backend behind a TECHNOVA gateway that fails closed, validates real user sessions, signs short-lived internal identity assertions, allowlists only approved routes, blocks administrative routes from ordinary users, and prevents direct network access to the service. Production secrets and the intended administrator identity must be explicitly configured. If a safe gateway cannot enforce these boundaries without modifying protected source, stop and request written permission to fix the source.

This is a code-path finding, not a completed penetration test. A full route-by-route authorization review and negative tests are still required.
