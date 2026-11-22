import { Router, type Request, type Response, type NextFunction } from "express";
import { rateLimit } from "express-rate-limit";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { User, RefreshToken, EmailToken } from "./models.js";
import { hashToken, newFamilyId, newOpaqueToken, signAccessToken, verifyAccessToken } from "./security.js";
import { emailIsConfigured, sendPasswordResetEmail, sendVerificationEmail } from "./mailer.js";

declare global {
  namespace Express {
    interface Request {
      technovaUser?: { id: string; name: string; email: string; role: string };
    }
  }
}
export const authRouter = Router();
authRouter.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 12, standardHeaders: true, legacyHeaders: false }));

const emailSchema = z.string().trim().email().max(254).transform(v => v.toLowerCase());
const passwordSchema = z.string().min(12).max(128);
const registerSchema = z.object({ name: z.string().trim().min(2).max(80), email: emailSchema, password: passwordSchema });
const loginSchema = z.object({ email: emailSchema, password: z.string().min(1).max(128) });
const fail = (res: Response, status: number, code: string, message: string) => res.status(status).json({ error: { code, message } });
const publicUser = (user: any) => ({ id: String(user._id), name: user.name, email: user.email, role: user.role, emailVerified: Boolean(user.emailVerifiedAt) });

async function issueTokens(user: any, familyId = newFamilyId(), userAgent = "") {
  const refreshToken = newOpaqueToken();
  await RefreshToken.create({
    userId: user._id, tokenHash: hashToken(refreshToken), familyId,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userAgent: userAgent.slice(0, 300)
  });
  return { accessToken: signAccessToken({ id: String(user._id), role: user.role }), refreshToken };
}
async function createEmailToken(userId: unknown, purpose: "verify_email" | "reset_password", ttlMs: number) {
  const token = newOpaqueToken();
  await EmailToken.create({ userId, tokenHash: hashToken(token), purpose, expiresAt: new Date(Date.now() + ttlMs) });
  return token;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.header("authorization") || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) return fail(res, 401, "not_authenticated", "Sign in to continue.");
    const payload = verifyAccessToken(token);
    if (payload.typ !== "access" || !payload.sub) return fail(res, 401, "invalid_token", "Your session is invalid.");
    const user = await User.findById(payload.sub).select("name email role status emailVerifiedAt");
    if (!user || user.status !== "active") return fail(res, 401, "account_unavailable", "This account is unavailable.");
    if (!user.emailVerifiedAt) return fail(res, 403, "email_not_verified", "Verify your email before continuing.");
    req.technovaUser = { id: String(user._id), name: user.name, email: user.email, role: user.role };
    next();
  } catch {
    return fail(res, 401, "invalid_token", "Your session is invalid or expired.");
  }
}

authRouter.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return fail(res, 400, "invalid_input", "Enter a valid name, email and password of at least 12 characters.");
  if (!emailIsConfigured()) return fail(res, 503, "email_unavailable", "Registration is unavailable until email verification is configured.");
  if (await User.exists({ email: parsed.data.email })) return fail(res, 409, "email_taken", "An account already exists for this email.");
  const user = await User.create({
    name: parsed.data.name, email: parsed.data.email,
    passwordHash: await bcrypt.hash(parsed.data.password, 12),
    role: "user", status: "active", emailVerifiedAt: null
  });
  const token = await createEmailToken(user._id, "verify_email", 30 * 60 * 1000);
  try {
    await sendVerificationEmail(user.email, user.name, token);
  } catch {
    await EmailToken.deleteOne({ tokenHash: hashToken(token) });
    return fail(res, 503, "email_delivery_failed", "Your account was created but the verification email could not be sent. Request a new link later.");
  }
  res.status(202).json({ ok: true, verificationRequired: true, message: "Check your email to verify your account." });
});

authRouter.post("/verify-email", async (req, res) => {
  const parsed = z.string().min(32).max(200).safeParse(req.body?.token);
  if (!parsed.success) return fail(res, 400, "invalid_token", "The verification link is invalid.");
  const record = await EmailToken.findOneAndUpdate(
    { tokenHash: hashToken(parsed.data), purpose: "verify_email", usedAt: null, expiresAt: { $gt: new Date() } },
    { $set: { usedAt: new Date() } }, { new: true }
  );
  if (!record) return fail(res, 400, "expired_token", "This verification link is invalid or has expired.");
  await User.updateOne({ _id: record.userId }, { $set: { emailVerifiedAt: new Date() } });
  res.json({ ok: true, message: "Your email is verified. You can now sign in." });
});

authRouter.post("/resend-verification", async (req, res) => {
  const parsed = z.object({ email: emailSchema }).safeParse(req.body);
  if (!parsed.success) return fail(res, 400, "invalid_input", "Enter a valid email address.");
  const user = await User.findOne({ email: parsed.data.email });
  if (user && !user.emailVerifiedAt && emailIsConfigured()) {
    const token = await createEmailToken(user._id, "verify_email", 30 * 60 * 1000);
    await sendVerificationEmail(user.email, user.name, token);
  }
  res.json({ ok: true, message: "If the account needs verification, an email will be sent." });
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return fail(res, 400, "invalid_input", "Enter a valid email and password.");
  const user = await User.findOne({ email: parsed.data.email }).select("+passwordHash");
  const matches = user ? await bcrypt.compare(parsed.data.password, user.passwordHash) : false;
  if (!user || !matches) return fail(res, 401, "invalid_credentials", "Email or password is incorrect.");
  if (user.status !== "active") return fail(res, 403, "account_unavailable", "This account is unavailable.");
  if (!user.emailVerifiedAt) return fail(res, 403, "email_not_verified", "Verify your email before signing in.");
  user.lastLoginAt = new Date();
  await user.save();
  const tokens = await issueTokens(user, undefined, String(req.header("user-agent") || ""));
  res.json({ ok: true, user: publicUser(user), ...tokens });
});

authRouter.post("/refresh", async (req, res) => {
  const parsed = z.object({ refreshToken: z.string().min(40).max(200) }).safeParse(req.body);
  if (!parsed.success) return fail(res, 401, "invalid_refresh", "Your session has expired. Sign in again.");
  const existing = await RefreshToken.findOne({ tokenHash: hashToken(parsed.data.refreshToken) });
  if (!existing) return fail(res, 401, "invalid_refresh", "Your session has expired. Sign in again.");
  if (existing.revokedAt) {
    await RefreshToken.updateMany({ familyId: existing.familyId, revokedAt: null }, { $set: { revokedAt: new Date() } });
    return fail(res, 401, "refresh_reuse", "This session was already used. Sign in again.");
  }
  if (existing.expiresAt <= new Date()) return fail(res, 401, "expired_refresh", "Your session has expired. Sign in again.");
  const revoked = await RefreshToken.updateOne({ _id: existing._id, revokedAt: null }, { $set: { revokedAt: new Date() } });
  if (revoked.modifiedCount !== 1) {
    await RefreshToken.updateMany({ familyId: existing.familyId, revokedAt: null }, { $set: { revokedAt: new Date() } });
    return fail(res, 401, "refresh_reuse", "This session was already used. Sign in again.");
  }
  const user = await User.findById(existing.userId);
  if (!user || user.status !== "active" || !user.emailVerifiedAt) return fail(res, 401, "account_unavailable", "This account is unavailable.");
  const tokens = await issueTokens(user, existing.familyId, String(req.header("user-agent") || ""));
  res.json({ ok: true, user: publicUser(user), ...tokens });
});

authRouter.post("/logout", async (req, res) => {
  const parsed = z.object({ refreshToken: z.string().min(40).max(200).optional() }).safeParse(req.body ?? {});
  if (parsed.success && parsed.data.refreshToken) {
    await RefreshToken.updateOne({ tokenHash: hashToken(parsed.data.refreshToken), revokedAt: null }, { $set: { revokedAt: new Date() } });
  }
  res.json({ ok: true });
});

authRouter.get("/me", requireAuth, (req, res) => res.json({ user: req.technovaUser }));

authRouter.post("/forgot-password", async (req, res) => {
  const parsed = z.object({ email: emailSchema }).safeParse(req.body);
  if (!parsed.success) return fail(res, 400, "invalid_input", "Enter a valid email address.");
  const user = await User.findOne({ email: parsed.data.email });
  if (user && user.emailVerifiedAt && emailIsConfigured()) {
    const token = await createEmailToken(user._id, "reset_password", 15 * 60 * 1000);
    await sendPasswordResetEmail(user.email, user.name, token);
  }
  res.json({ ok: true, message: "If the account exists, password reset instructions will be sent." });
});

authRouter.post("/reset-password", async (req, res) => {
  const parsed = z.object({ token: z.string().min(32).max(200), password: passwordSchema }).safeParse(req.body);
  if (!parsed.success) return fail(res, 400, "invalid_input", "The reset link or new password is invalid.");
  const record = await EmailToken.findOneAndUpdate(
    { tokenHash: hashToken(parsed.data.token), purpose: "reset_password", usedAt: null, expiresAt: { $gt: new Date() } },
    { $set: { usedAt: new Date() } }, { new: true }
  );
  if (!record) return fail(res, 400, "expired_token", "This reset link is invalid or has expired.");
  await User.updateOne({ _id: record.userId }, { $set: { passwordHash: await bcrypt.hash(parsed.data.password, 12) } });
  await RefreshToken.updateMany({ userId: record.userId, revokedAt: null }, { $set: { revokedAt: new Date() } });
  res.json({ ok: true, message: "Password updated. Sign in again." });
});
