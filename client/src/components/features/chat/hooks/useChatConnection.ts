import { useRef } from "react";
import type { WsMessage, WsResponsePayload } from "@types";
import { ChatWebSocket } from "@lib/ws";

const messageFactory = (content: string): WsMessage => {
  return {
    role: "user",
    content,
  };
};

interface UseChatConnectionOptions {
  url: string;
}

interface ChatInitializeOptions {
  signal?: AbortSignal;
}

export function useChatConnection({ url }: UseChatConnectionOptions) {
  const wsRef = useRef<ChatWebSocket | null>(null);
  const historyRef = useRef<WsMessage[]>([]);

  const initialize = async ({
    signal = new AbortController().signal,
  }: ChatInitializeOptions) => {
    if (wsRef.current) return true;

    try {
      const ws = new ChatWebSocket({ url });
      await ws.connect();

      if (signal.aborted) {
        ws.disconnect();
        throw Error(signal.reason);
      }

      wsRef.current = ws;
      return true;
    } catch (err) {
      // TODO: notify error;
      return false;
    }
  };

  const disconnect = () => {
    wsRef.current?.disconnect();
    wsRef.current = null;
  };

  const subscribe = (cb: (response: WsResponsePayload) => void) => {
    if (!wsRef.current) {
      throw Error("useChatConnection: not initialized");
    }

    return wsRef.current.onmessage((payload) => {
      if (payload.success) historyRef.current.push(payload.message);
      cb(payload);
    });
  };

  const send = (content: string) => {
    if (!wsRef.current) return false;

    const message = messageFactory(content);

    try {
      wsRef.current.send({ message, history: historyRef.current });
      historyRef.current.push(message);
      return true;
    } catch (err) {
      // TODO: notify error;
      return false;
    }
  };

  return { initialize, disconnect, subscribe, send };
}
