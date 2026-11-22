import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { allowedOrigins } from "./env.js";
import { authRouter } from "./auth.js";

export const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: true, legacyHeaders: false }));
app.get("/health", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: connected ? "ok" : "degraded", database: connected ? "connected" : "disconnected" });
});
app.use("/api/v1/auth", authRouter);
app.use((_req, res) => res.status(404).json({ error: { code: "not_found", message: "The requested endpoint does not exist." } }));
app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = Number(error?.status) || 500;
  const code = String(error?.code || "internal_error");
  const message = status >= 500 ? "The server could not complete the request." : String(error?.message || "Request failed.");
  if (status >= 500) console.error("API error", error);
  res.status(status).json({ error: { code, message } });
});
