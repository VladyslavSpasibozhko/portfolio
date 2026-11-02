import { useState } from "react";
import { deleteSession } from "@api/chat";
import { request } from "@lib/request";

interface UseDeleteSessionResult {
  deleteSession: (sessionId: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useDeleteSession(): UseDeleteSessionResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (sessionId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const result = await request<boolean>(deleteSession(sessionId));

    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return false;
    }

    return true;
  };

  return { deleteSession: remove, loading, error };
}
