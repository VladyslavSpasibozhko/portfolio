import { useEffect, useRef, useState } from "react";
import type { Message } from "@global-types/message";
import { createUserMessage, createAssistantMessage } from "@global-utils/message";
import { useChatSession } from "./useChatSession";
import { useChat } from "./useChat";
import { useCreateSession } from "./useCreateSession";
import { useGetChatMessages } from "./useGetChatMessages";

export type ChatStatus = "idle" | "waiting" | "generating" | "generated" | "failed";

interface UseChatMessagesResult {
  messages: Message[];
  status: ChatStatus;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  retrySendMessage: () => Promise<void>;
  isGenerating: boolean;
  isWaiting: boolean;
  isFailed: boolean;
}

export function useChatMessages(): UseChatMessagesResult {
  const streamingContentRef = useRef("");

  const [status, setStatus] = useState<ChatStatus>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<Message | null>(
    null,
  );
  const [userMessage, setUserMessage] = useState<string>('');

  const { sessionId, setSession } = useChatSession();
  const { createSession: createSessionReq, error: createSessionError } =
    useCreateSession();
  const { getMessages } = useGetChatMessages();


  const isGenerating = status === "generating";
  const isWaiting = status === "waiting";
  const isFailed = status === "failed";

  const {
    sendMessage: sendChatMessage,
    error: chatError,
  } = useChat({
    onDelta: (text) => {
      setStatus("generating");

      streamingContentRef.current += text;
      setStreamingMessage(createAssistantMessage(streamingContentRef.current));
    },
    onDone: () => {
      setStatus("generated");
      setMessages((messages) => messages.concat(createAssistantMessage(streamingContentRef.current)))
      setStreamingMessage(null);
      streamingContentRef.current = "";
      setUserMessage('');
    },
    onError: () => {
      setStatus("failed");
      streamingContentRef.current = "";
      setStreamingMessage(null);
    },
  });

  const createSession = async () => {
    const id = await createSessionReq();
    if (id) {
      setSession(id);
    }
    return id;
  }

  const getSessionMessages = async (id: string) => {
    const messages = await getMessages(id);
    if (!messages) return;
    setMessages(messages);
  }

  const sendMessage = async (content: string, id: string) => {
    const preparedMessage: Message = createUserMessage(content);

    setStatus("waiting");
    setMessages((prev) => [...prev, preparedMessage]);

    await sendChatMessage({ message: content, sessionId: id })
  };

  const retrySendMessage = async () => {
    if (!sessionId) {
      console.error('No session id found');
      return;
    }

    setStatus('idle');

    if (createSessionError) {
      // no user message was appended when session creation failed
    }

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

  const displayMessages =
    streamingMessage
      ? [...messages, streamingMessage]
      : messages;


  // Create session or fetch message by ID.
  useEffect(() => {
    if (!sessionId) {
      createSession();
      return;
    }

    console.log(sessionId);

    getSessionMessages(sessionId);
  }, [sessionId]);

  return {
    messages: displayMessages,
    status,
    error: createSessionError ?? chatError,
    sendMessage: prepareSending,
    retrySendMessage: retrySendMessage,
    isGenerating,
    isWaiting,
    isFailed,
  };
}
