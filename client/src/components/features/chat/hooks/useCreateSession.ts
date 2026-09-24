import { useState } from "react";
import { createSession } from "@api/chat";
import { request } from "@lib/request";
import type { CreateChatResponse } from "@global-types/api";

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

    const result = await request<CreateChatResponse>(createSession());

    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return null;
    }

    return result.data.sessionId;
  };

  return { createSession: create, loading, error };
}
