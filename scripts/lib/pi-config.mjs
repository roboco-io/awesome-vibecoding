import { getModel } from "@earendil-works/pi-ai/compat";

const PROVIDERS = {
  kimi: { catalog: "moonshotai", model: "kimi-k3", key: "KIMI_API_KEY", baseUrl: "https://api.moonshot.ai/v1" },
  qwen: { catalog: "qwen-token-plan", model: "qwen3.8-max", key: "DASHSCOPE_API_KEY", baseUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1" },
};

function positiveInteger(env, name, fallback, max) {
  const value = Number(env[name] || fallback);
  if (!Number.isInteger(value) || value < 1 || value > max) throw new Error(`${name} must be an integer from 1 to ${max}`);
  return value;
}

export function resolveConfig(env = process.env) {
  const provider = env.AI_PROVIDER || "kimi";
  const preset = PROVIDERS[provider];
  if (!preset) throw new Error("AI_PROVIDER must be kimi or qwen");
  if (!env[preset.key]?.trim()) throw new Error(`Missing ${preset.key}`);
  const template = getModel(preset.catalog, preset.model);
  if (!template) throw new Error(`Pi catalog is missing ${preset.model}`);
  const baseUrl = env.AI_BASE_URL || preset.baseUrl;
  const parsed = new URL(baseUrl);
  if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error("AI_BASE_URL must be an HTTPS API base URL without credentials, query, or fragment");
  }
  const id = env.AI_MODEL || preset.model;
  if (!/^[a-zA-Z0-9._:/-]+$/.test(id)) throw new Error("Invalid AI_MODEL");
  return {
    provider, apiKey: env[preset.key],
    maxTurns: positiveInteger(env, "AI_MAX_TURNS", 30, 100),
    timeoutMs: positiveInteger(env, "AI_TIMEOUT_SECONDS", 600, 1800) * 1000,
    model: {
      ...structuredClone(template), id, name: id, provider: "automation", baseUrl,
      maxTokens: positiveInteger(env, "AI_MAX_TOKENS", 8192, 32768),
      compat: { ...template.compat, ...(provider === "kimi" && id.startsWith("kimi-k3") ? { maxTokensField: "max_completion_tokens" } : {}) },
    },
  };
}
