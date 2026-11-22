import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";

const API_BASE = (process.env.EXPO_PUBLIC_API_URL || "").replace(/\/+$/, "");
const TOKEN_KEY = "technova.session.v1";

export type AuthUser = { id: string; name: string; email: string; role: string; emailVerified?: boolean };
type TokenPair = { accessToken: string; refreshToken: string };
type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  apiConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<string>;
  verifyEmail: (token: string) => Promise<string>;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (token: string, password: string) => Promise<string>;
  signOut: () => Promise<void>;
};
const AuthContext = createContext<AuthContextValue | null>(null);

async function apiRequest<T>(path: string, body?: unknown, accessToken?: string): Promise<T> {
  if (!API_BASE) throw new Error("The TECHNOVA API address has not been configured for this build.");
  const response = await fetch(API_BASE + path, {
    method: body === undefined ? "GET" : "POST",
    headers: { "Content-Type": "application/json", ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error?.message || data?.message || "The request could not be completed.");
  return data as T;
}
async function saveTokens(tokens: TokenPair) {
  await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokens));
}
async function readTokens(): Promise<TokenPair | null> {
  const raw = await SecureStore.getItemAsync(TOKEN_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as TokenPair;
    return parsed.accessToken && parsed.refreshToken ? parsed : null;
  } catch { return null; }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshSession = useCallback(async (tokens: TokenPair) => {
    const next = await apiRequest<TokenPair & { user: AuthUser }>("/api/v1/auth/refresh", { refreshToken: tokens.refreshToken });
    await saveTokens({ accessToken: next.accessToken, refreshToken: next.refreshToken });
    return next;
  }, []);
  useEffect(() => {
    let active = true;
    (async () => {
      if (!API_BASE) { if (active) setLoading(false); return; }
      try {
        const tokens = await readTokens();
        if (!tokens) return;
        let current = tokens;
        let profile = await fetch(API_BASE + "/api/v1/auth/me", { headers: { Authorization: "Bearer " + current.accessToken } });
        if (profile.status === 401) {
          current = await refreshSession(current);
          profile = await fetch(API_BASE + "/api/v1/auth/me", { headers: { Authorization: "Bearer " + current.accessToken } });
        }
        if (!profile.ok) throw new Error("Session expired");
        const data = await profile.json();
        if (active) setUser(data.user as AuthUser);
      } catch {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [refreshSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await apiRequest<TokenPair & { user: AuthUser }>("/api/v1/auth/login", { email: email.trim(), password });
    await saveTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken });
    setUser(result.user);
  }, []);
  const register = useCallback(async (name: string, email: string, password: string) => {
    const result = await apiRequest<{ message: string }>("/api/v1/auth/register", { name: name.trim(), email: email.trim(), password });
    return result.message;
  }, []);
  const verifyEmail = useCallback(async (token: string) => {
    const result = await apiRequest<{ message: string }>("/api/v1/auth/verify-email", { token });
    return result.message;
  }, []);
  const forgotPassword = useCallback(async (email: string) => {
    const result = await apiRequest<{ message: string }>("/api/v1/auth/forgot-password", { email: email.trim() });
    return result.message;
  }, []);
  const resetPassword = useCallback(async (token: string, password: string) => {
    const result = await apiRequest<{ message: string }>("/api/v1/auth/reset-password", { token, password });
    return result.message;
  }, []);
  const signOut = useCallback(async () => {
    const tokens = await readTokens();
    if (tokens && API_BASE) {
      try { await apiRequest("/api/v1/auth/logout", { refreshToken: tokens.refreshToken }); } catch { /* local credentials are still cleared */ }
    }
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setUser(null);
  }, []);
  const value = useMemo(() => ({ user, loading, apiConfigured: Boolean(API_BASE), signIn, register, verifyEmail, forgotPassword, resetPassword, signOut }), [user, loading, signIn, register, verifyEmail, forgotPassword, resetPassword, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
