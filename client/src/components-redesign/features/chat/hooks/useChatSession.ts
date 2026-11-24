import { useState } from "react";

const SESSION_STORAGE_KEY = "chat-session-id";
interface UseChatSessionResult {
  sessionId: string | null;
  setSession: (id: string) => void;
}

export function useChatSession(): UseChatSessionResult {
  const [sessionId, setSessionId] = useState<string | null>(() =>
    sessionStorage.getItem(SESSION_STORAGE_KEY),
  );

  const setSession = (id: string) => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    setSessionId(id);
  }

  return { sessionId, setSession };
}
