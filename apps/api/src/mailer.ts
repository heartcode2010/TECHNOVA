import { env } from "./env.js";

export const emailIsConfigured = () => Boolean(env.RESEND_API_KEY && env.EMAIL_FROM);
async function sendEmail(to: string, subject: string, html: string) {
  if (!emailIsConfigured()) throw Object.assign(new Error("Email delivery is not configured"), { status: 503, code: "email_unavailable" });
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.EMAIL_FROM, to: [to], subject, html })
  });
  if (!response.ok) throw Object.assign(new Error("Email provider rejected the request"), { status: 502, code: "email_delivery_failed" });
}
const escapeHtml = (v: string) => v.replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c] ?? c));
export async function sendVerificationEmail(to: string, name: string, token: string) {
  const url = env.MOBILE_DEEP_LINK_BASE + "?token=" + encodeURIComponent(token);
  await sendEmail(to, "Verify your TECHNOVA account", "<p>Hello " + escapeHtml(name) + ",</p><p>Open this link in TECHNOVA to verify your email:</p><p><a href=\"" + url + "\">Verify email</a></p><p>This link expires in 30 minutes. Ignore this email if you did not create the account.</p>");
}
export async function sendPasswordResetEmail(to: string, name: string, token: string) {
  const url = "technova://reset-password?token=" + encodeURIComponent(token);
  await sendEmail(to, "Reset your TECHNOVA password", "<p>Hello " + escapeHtml(name) + ",</p><p><a href=\"" + url + "\">Reset password</a></p><p>This link expires in 15 minutes. Ignore this email if you did not request it.</p>");
}
