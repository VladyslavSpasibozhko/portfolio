import { useEffect, useState } from "react";
import { getFlags } from "@api/flags";
import { request } from "@lib/request";
import type { GetFlagsResponse } from "@global-types/api";
import type { Flags } from "@global-types/main/flags";

interface UseFlagsResult {
  flags: Flags | null;
  loading: boolean;
  error: string | null;
}

export function useFlags(): UseFlagsResult {
  const [flags, setFlags] = useState<Flags | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const load = async () => {
      const result = await request<GetFlagsResponse>(getFlags());

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
