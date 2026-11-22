import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "moderator", "admin"], default: "user", required: true },
  status: { type: String, enum: ["active", "suspended"], default: "active", required: true },
  emailVerifiedAt: { type: Date, default: null },
  lastLoginAt: { type: Date, default: null }
}, { timestamps: true, versionKey: false });
userSchema.index({ email: 1 }, { unique: true });

const refreshTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "TechnovaUser", required: true, index: true },
  tokenHash: { type: String, required: true, unique: true },
  familyId: { type: String, required: true, index: true },
  expiresAt: { type: Date, required: true, index: true },
  revokedAt: { type: Date, default: null },
  userAgent: { type: String, maxlength: 300, default: "" }
}, { timestamps: true, versionKey: false });
refreshTokenSchema.index({ tokenHash: 1 }, { unique: true });

const emailTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "TechnovaUser", required: true, index: true },
  tokenHash: { type: String, required: true, unique: true },
  purpose: { type: String, enum: ["verify_email", "reset_password"], required: true },
  expiresAt: { type: Date, required: true, index: true },
  usedAt: { type: Date, default: null }
}, { timestamps: true, versionKey: false });
emailTokenSchema.index({ tokenHash: 1 }, { unique: true });

export const User = model("TechnovaUser", userSchema);
export const RefreshToken = model("TechnovaRefreshToken", refreshTokenSchema);
export const EmailToken = model("TechnovaEmailToken", emailTokenSchema);
