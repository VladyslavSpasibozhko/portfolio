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
  sessionLifeTime: 24 * 60 * 60 * 1000,
};
