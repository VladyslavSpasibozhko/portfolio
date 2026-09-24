import { useCallback, useState } from "react";
import { useCreateSession } from "./useCreateSession";

const SESSION_STORAGE_KEY = "chat-session-id";

interface UseChatSessionResult {
  sessionId: string | null;
  ensureSession: () => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export function useChatSession(): UseChatSessionResult {
  const [sessionId, setSessionId] = useState<string | null>(() =>
    sessionStorage.getItem(SESSION_STORAGE_KEY),
  );
  const { createSession, loading, error } = useCreateSession();

  const ensureSession = useCallback(async (): Promise<string | null> => {
    if (sessionId) return sessionId;

    const newSessionId = await createSession();
    if (!newSessionId) return null;

    sessionStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
    setSessionId(newSessionId);

    return newSessionId;
  }, [sessionId, createSession]);

  return { sessionId, ensureSession, loading, error };
}
