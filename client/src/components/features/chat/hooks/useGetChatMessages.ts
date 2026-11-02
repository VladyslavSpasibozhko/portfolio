import { useState } from "react";
import { getChatMessages } from "@api/chat";
import { request } from "@lib/request";
import type { commonSchemas } from "@shared/schemas";

interface UseGetChatMessagesResult {
  getMessages: (sessionId: string) => Promise<commonSchemas.Message[] | null>;
  loading: boolean;
  error: string | null;
}

export function useGetChatMessages(): UseGetChatMessagesResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMessages = async (sessionId: string): Promise<commonSchemas.Message[] | null> => {
    setLoading(true);
    setError(null);

    const result = await request<commonSchemas.Message[]>(getChatMessages(sessionId));

    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return null;
    }

    return result.data;
  };

  return { getMessages, loading, error };
}
