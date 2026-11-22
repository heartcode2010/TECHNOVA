import { app } from "./app.js";
import { env } from "./env.js";
import mongoose from "mongoose";

async function main() {
  await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 10000, maxPoolSize: 10, minPoolSize: 1 });
  const server = app.listen(env.PORT, "0.0.0.0", () => console.log("TECHNOVA API listening on port " + env.PORT));
  const shutdown = async () => { server.close(); await mongoose.disconnect(); };
  process.on("SIGTERM", () => void shutdown());
  process.on("SIGINT", () => void shutdown());
}
main().catch(error => { console.error("TECHNOVA API startup failed", error); process.exit(1); });
