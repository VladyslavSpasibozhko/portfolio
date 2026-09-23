import { useState } from "react";
import { createSession } from "@api/chat";
import { request } from "@lib/request";
import type { Session } from "@types";

interface UseCreateSessionResult {
  createSession: () => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export function useCreateSession(): UseCreateSessionResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (): Promise<string | null> => {
    setLoading(true);
    setError(null);

    const result = await request<Session>(createSession());

    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return null;
    }

    return result.data.sessionId;
  };

  return { createSession: create, loading, error };
}
