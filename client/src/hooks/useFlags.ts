import { useEffect, useState } from "react";
import { getFlags } from "@api/flags";
import { request } from "@lib/request";
import type { flagsConfig } from "@portfolio/shared/config";

interface UseFlagsResult {
  flags: flagsConfig.Flags | null;
  loading: boolean;
  error: string | null;
}

export function useFlags(): UseFlagsResult {
  const [flags, setFlags] = useState<flagsConfig.Flags | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const load = async () => {
      const result = await request<flagsConfig.Flags>(getFlags());

      setLoading(false);
      if (!result.success) {
        setError(result.error.message);
        return;
      }
      setFlags(result.data);
    };

    load();
  }, []);

  return { flags, loading, error };
}
