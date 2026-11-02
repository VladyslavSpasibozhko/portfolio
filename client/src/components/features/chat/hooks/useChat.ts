import { useCallback, useRef, useState } from "react";
import { sendMessage as sendMessageConfig } from "@api/chat";
import { streamRequest } from "@lib/sse";
import type { commonSchemas, httpSchemas } from "@shared/schemas";

interface UseChatCallbacks {
  onMessage: (event: httpSchemas.StreamResponse) => void;
}

interface UseChatResult {
  sendMessage: (request: commonSchemas.CreateMessage) => Promise<void>;
  loading: boolean;
  error: string | null;
}

function parseFrame(frame: string): httpSchemas.StreamResponse | null {
  const dataLine = frame.split("\n").find((line) => line.startsWith("data:"));
  if (!dataLine) return null;

  try {
    return JSON.parse(dataLine.slice("data:".length).trim()) as httpSchemas.StreamResponse;
  } catch {
    return null;
  }
}

export function useChat({ onMessage }: UseChatCallbacks): UseChatResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (request: commonSchemas.CreateMessage) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      const handleEvent = (event: httpSchemas.StreamResponse) => {
        if (event.type !== "delta") setLoading(false);
        if (event.type === "error") setError(event.message);
        onMessage(event);
      };

      const handleFrame = (frame: string) => {
        const event = parseFrame(frame);
        if (event) handleEvent(event);
      };

      const handleError = (message: string) => handleEvent({ type: "error", message });

      await streamRequest(sendMessageConfig(request), {
        signal: controller.signal,
        onFrame: handleFrame,
        onError: handleError,
      });
    },
    [onMessage],
  );

  return { sendMessage, loading, error };
}
