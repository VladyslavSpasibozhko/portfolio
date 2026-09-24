import { useState } from "react";
import { getChatMessages } from "@api/chat";
import { request } from "@lib/request";
import type { GetChatMessagesResponse } from "@global-types/api";
import type { Message } from "@global-types/message";

interface UseGetChatMessagesResult {
  getMessages: (sessionId: string) => Promise<Message[] | null>;
  loading: boolean;
  error: string | null;
}

export function useGetChatMessages(): UseGetChatMessagesResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMessages = async (sessionId: string): Promise<Message[] | null> => {
    setLoading(true);
    setError(null);

    const result = await request<GetChatMessagesResponse>(getChatMessages(sessionId));

    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return null;
    }

    return result.data;
  };

  return { getMessages, loading, error };
}
