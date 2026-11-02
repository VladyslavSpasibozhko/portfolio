import { useEffect, useState } from "react";
import type { commonSchemas, httpSchemas } from "@shared/schemas";
import { commonUtils } from "@shared/utils";
import { useChatSession } from "./useChatSession";
import { useChat } from "./useChat";
import { useCreateSession } from "./useCreateSession";
import { useGetChatMessages } from "./useGetChatMessages";
import { StatusEmitter } from "../utils/statusEmitter";
import { StreamEmitter } from "../utils/streamEmitter";

interface UseChatMessagesResult {
  messages: commonSchemas.Message[];
  statusEmitter: StatusEmitter;
  streamEmitter: StreamEmitter;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  retrySendMessage: () => Promise<void>;
}

export function useChatMessages(): UseChatMessagesResult {
  const [statusEmitter] = useState(() => new StatusEmitter("idle"));
  const [streamEmitter] = useState(() => new StreamEmitter());

  const [messages, setMessages] = useState<commonSchemas.Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');

  const { sessionId, setSession } = useChatSession();
  const { createSession: createSessionReq, error: createSessionError } =
    useCreateSession();
  const { getMessages } = useGetChatMessages();



  const {
    sendMessage: sendChatMessage,
    error: chatError,
  } = useChat({
    onMessage: (event) => {

      const streamHandlers: Record<httpSchemas.StreamType, () => void> = {
        delta: () => statusEmitter.set("generating"),
        done: () => {
          const content = streamEmitter.content;
          statusEmitter.set("generated");
          setMessages((messages) => messages.concat(commonUtils.createAssistantMessage(content)));
          setUserMessage('');
        },
        error: () => statusEmitter.set("failed"),
      };

      streamHandlers[event.type]();
      streamEmitter.emit(event);
    },
  });

  const createSession = async () => {
    const id = await createSessionReq();
    if (id) setSession(id);
    return id;
  }

  const getSessionMessages = async (id: string) => {
    const messages = await getMessages(id);
    if (!messages) return false;
    setMessages(messages);
    return true;
  }

  const sendMessage = async (content: string, id: string) => {
    const preparedMessage: commonSchemas.Message = commonUtils.createUserMessage(content);

    statusEmitter.set("waiting");
    setMessages((prev) => [...prev, preparedMessage]);

    await sendChatMessage({ message: content, sessionId: id })
  };

  const retrySendMessage = async () => {
    if (!sessionId) {
      console.error('No session id found');
      return;
    }

    statusEmitter.set('idle');

    if (chatError) {
      setMessages((messages) => messages.slice(0, -1));
    }

    sendMessage(userMessage, sessionId);
  }

  const prepareSending = async (content: string) => {
    if (!sessionId) {
      console.error('No session id found');
      return;
    }
    setUserMessage(content);
    return sendMessage(content, sessionId)
  }

  // Create session or fetch message by ID.
  useEffect(() => {
    const initSession = async () => {
      if (!sessionId) {
        await createSession();
        return;
      }

      const loaded = await getSessionMessages(sessionId);
      // If session exist but fetch is failed, create new session.
      if (!loaded) {
        await createSession();
        return;
      }
      statusEmitter.set('idle');
    };

    initSession();
  }, [sessionId]);

  return {
    messages,
    statusEmitter,
    streamEmitter,
    error: createSessionError ?? chatError,
    sendMessage: prepareSending,
    retrySendMessage: retrySendMessage,
  };
}
