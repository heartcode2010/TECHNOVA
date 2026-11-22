# TECHNOVA API

Separate mobile-facing identity service. It does not modify or replace the copied HEARTCODE or Dark Obsydia AI services.

## Local development
1. Copy `.env.example` to `.env`.
2. Set a MongoDB connection string and a cryptographically random JWT access secret of at least 32 characters.
3. Configure Resend with `RESEND_API_KEY` and `EMAIL_FROM` to enable registration and password recovery.
4. Run `npm install`, then `npm run dev`.

## Auth contract
- `POST /api/v1/auth/register` — creates an unverified account and sends an email verification link.
- `POST /api/v1/auth/verify-email` — consumes a one-time verification token.
- `POST /api/v1/auth/login` — returns a 15-minute access token and rotating 30-day refresh token.
- `POST /api/v1/auth/refresh` — rotates the refresh token; reuse revokes the token family.
- `POST /api/v1/auth/logout` — revokes the supplied refresh token.
- `GET /api/v1/auth/me` — returns the verified current user.
- `POST /api/v1/auth/forgot-password` and `/reset-password` — email-based recovery.

Passwords are hashed with bcrypt. Refresh and email tokens are high-entropy random values stored only as SHA-256 hashes. Roles are assigned server-side. Registration remains unavailable until email delivery is configured.

## Production blockers
No production database URI, JWT secret, Resend key, sender domain, deployment or DNS has been configured by this scaffold. Do not expose this API until those are configured, database network access is restricted, email deliverability is verified and auth integration tests pass.
