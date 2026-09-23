import { useCallback, useRef, useState } from "react";
import { sendMessage as sendMessageConfig } from "@api/chat";
import { streamRequest } from "@lib/sse";
import type { Message, StreamResponse } from "@types";

interface UseChatCallbacks {
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

interface UseChatResult {
  sendMessage: (message: Message) => Promise<void>;
  loading: boolean;
  error: string | null;
}

function parseFrame(frame: string): StreamResponse | null {
  const dataLine = frame.split("\n").find((line) => line.startsWith("data:"));
  if (!dataLine) return null;

  try {
    return JSON.parse(dataLine.slice("data:".length).trim()) as StreamResponse;
  } catch {
    return null;
  }
}

export function useChat({ onDelta, onDone, onError }: UseChatCallbacks): UseChatResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (message: Message) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      const handleFrame = (frame: string) => {
        const event = parseFrame(frame);
        if (!event) return;

        switch (event.type) {
          case "delta":
            onDelta(event.text);
            break;
          case "done":
            setLoading(false);
            onDone();
            break;
          case "error":
            setLoading(false);
            setError(event.message);
            onError(event.message);
            break;
          // "block" is reserved for future use; clients ignore unknown types (see types/transport.ts).
          default:
            break;
        }
      };

      const handleError = (message: string) => {
        setLoading(false);
        setError(message);
        onError(message);
      };

      await streamRequest(sendMessageConfig(message), {
        signal: controller.signal,
        onFrame: handleFrame,
        onError: handleError,
      });
    },
    [onDelta, onDone, onError],
  );

  return { sendMessage, loading, error };
}
