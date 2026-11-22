import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8080),
  MONGODB_URI: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ALLOWED_ORIGINS: z.string().default(""),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  MOBILE_DEEP_LINK_BASE: z.string().default("technova://verify-email")
});
export const env = schema.parse(process.env);
export const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map(v => v.trim()).filter(Boolean);
