import { createHash, randomBytes, randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "./env.js";

export const hashToken = (value: string) => createHash("sha256").update(value).digest("hex");
export const newOpaqueToken = () => randomBytes(48).toString("base64url");
export const newFamilyId = () => randomUUID();
export function signAccessToken(user: { id: string; role: string }) {
  return jwt.sign({ sub: user.id, role: user.role, typ: "access" }, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m", issuer: "technova-api", audience: "technova-mobile"
  });
}
export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    issuer: "technova-api", audience: "technova-mobile"
  }) as jwt.JwtPayload & { sub: string; role: string; typ: string };
}
