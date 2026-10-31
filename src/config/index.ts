import { flags } from './flags.js'

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

// Getters read lazily, so a module only fails on the vars it actually uses.
export const config = {
  get port() {
    return Number(requireEnv("PORT"));
  },
  get clientOrigin() {
    return requireEnv("CLIENT_ORIGIN");
  },
  get anthropicApiKey() {
    return requireEnv("ANTHROPIC_API_KEY");
  },
  get anthropicModel() {
    return requireEnv("ANTHROPIC_MODEL");
  },
  get redisUrl() {
    return requireEnv("UPSTASH_REDIS_REST_URL");
  },
  get redisToken() {
    return requireEnv("UPSTASH_REDIS_REST_TOKEN");
  },
  get qstashToken() {
    return requireEnv("QSTASH_TOKEN");
  },
  get qstashCurrentSigningKey() {
    return requireEnv("QSTASH_CURRENT_SIGNING_KEY");
  },
  get qstashNextSigningKey() {
    return requireEnv("QSTASH_NEXT_SIGNING_KEY");
  },
  get serverUrl() {
    return requireEnv("SERVER_URL");
  },
  sessionLifeTime: 24 * 60 * 60 * 1000,
  flags
};
