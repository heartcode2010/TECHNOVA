import { env } from "./env.js";

export interface ProviderConfig {
  name: string;
  label: string;
  baseURL: string;
  model: string;
  models: string[];
  keys: string[];
  local: boolean;
  timeoutMs: number;
  maxRetries: number;
  capabilities: { vision: boolean; audio: boolean; tools: boolean };
  extraBody: Record<string, unknown>;
  maxOutputCap: number;
}

interface Preset {
  label: string;
  baseURL: () => string;
  model: () => string;
  local: boolean;
  timeoutMs: number;
  extraBody: Record<string, unknown>;
  capabilities: { vision: boolean; audio: boolean; tools: boolean };
}

const PRESETS: Record<string, Preset> = {
  ollama: {
    label: "Ollama",
    baseURL: () => env().OLLAMA_URL,
    model: () => env().OLLAMA_MODEL,
    local: true,
    timeoutMs: 600_000,
    extraBody: { think: false },
    capabilities: { vision: false, audio: false, tools: true }
  },
  deepseek: {
    label: "DeepSeek",
    baseURL: () => "https://api.deepseek.com",
    model: () => "deepseek-v4-flash",
    local: false,
    timeoutMs: 120_000,
    extraBody: { thinking: { type: "disabled" } },
    capabilities: { vision: false, audio: false, tools: true }
  }
};

const GENERIC: Preset = {
  label: "OpenAI-compatible",
  baseURL: () => "",
  model: () => "",
  local: false,
  timeoutMs: 120_000,
  extraBody: {},
  capabilities: { vision: false, audio: false, tools: false }
};

function flag(value: string, fallback: boolean) {
  if (value === "") return fallback;
  return ["true", "1", "yes"].includes(value.toLowerCase());
}

function num(value: string, fallback: number) {
  const n = Number(value);
  return value !== "" && Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function providerConfig(): ProviderConfig {
  const e = env();
  const name = e.AI_PROVIDER || "ollama";
  const preset = PRESETS[name] || { ...GENERIC, label: name };
  const model = e.AI_MODEL || preset.model();
  const extra = e.AI_MODELS.split(",").map((m) => m.trim()).filter(Boolean);
  const keys = Array.from(new Set(e.AI_API_KEYS));
  return {
    name,
    label: preset.label,
    baseURL: e.AI_BASE_URL || preset.baseURL(),
    model,
    models: Array.from(new Set([model, ...extra])),
    keys: keys.length ? keys : preset.local ? ["local"] : [],
    local: preset.local,
    timeoutMs: num(e.AI_TIMEOUT_MS, preset.timeoutMs),
    maxRetries: num(e.AI_MAX_RETRIES, preset.local ? 1 : 3),
    capabilities: {
      vision: flag(e.AI_SUPPORTS_VISION, preset.capabilities.vision),
      audio: flag(e.AI_SUPPORTS_AUDIO, preset.capabilities.audio),
      tools: flag(e.AI_SUPPORTS_TOOLS, preset.capabilities.tools)
    },
    extraBody: e.AI_EXTRA_BODY ?? preset.extraBody,
    maxOutputCap: e.AI_MAX_OUTPUT_CAP
  };
}

export function keyFingerprint(secret: string) {
  return `${providerConfig().name}:${secret}`;
}
