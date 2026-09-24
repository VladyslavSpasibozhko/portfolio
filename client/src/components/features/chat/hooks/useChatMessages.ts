import { useEffect, useRef, useState } from "react";
import type { Message } from "@global-types/message";
import { createUserMessage, createAssistantMessage } from "@global-utils/message";
import { useChatSession } from "./useChatSession";
import { useChat } from "./useChat";
import { useCreateSession } from "./useCreateSession";
import { useGetChatMessages } from "./useGetChatMessages";
import { StatusEmitter } from "../utils/statusEmitter";
import { StreamEmitter } from "../utils/streamEmitter";

interface UseChatMessagesResult {
  messages: Message[];
  statusEmitter: StatusEmitter;
  streamEmitter: StreamEmitter;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  retrySendMessage: () => Promise<void>;
}

export function useChatMessages(): UseChatMessagesResult {
  const statusEmitterRef = useRef<StatusEmitter>(new StatusEmitter("idle"));
  const streamEmitterRef = useRef<StreamEmitter>(new StreamEmitter());

  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');

  const { sessionId, setSession } = useChatSession();
  const { createSession: createSessionReq, error: createSessionError } =
    useCreateSession();
  const { getMessages } = useGetChatMessages();

  const {
    sendMessage: sendChatMessage,
    error: chatError,
  } = useChat({
    onDelta: (text) => {
      statusEmitterRef.current.set("generating");
      streamEmitterRef.current.delta(text);
    },
    onDone: () => {
      const content = streamEmitterRef.current!.content;
      statusEmitterRef.current.set("generated");
      setMessages((messages) => messages.concat(createAssistantMessage(content)));
      streamEmitterRef.current!.done();
      setUserMessage('');
    },
    onError: (message) => {
      statusEmitterRef.current.set("failed");
      streamEmitterRef.current!.error(message);
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
    if (!messages) return false;
    setMessages(messages);
    return true;
  }

  const sendMessage = async (content: string, id: string) => {
    const preparedMessage: Message = createUserMessage(content);

    statusEmitterRef.current.set("waiting");
    setMessages((prev) => [...prev, preparedMessage]);

    await sendChatMessage({ message: content, sessionId: id })
  };

  const retrySendMessage = async () => {
    if (!sessionId) {
      console.error('No session id found');
      return;
    }

    statusEmitterRef.current.set('idle');

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

  // Create session or fetch message by ID.
  useEffect(() => {
    if (!sessionId) {
      createSession();
      return;
    }

    getSessionMessages(sessionId).then((result) => {
      // If session exist but fetch is failed, create new session.
      if (!result) createSession();
    })
  }, [sessionId]);

  return {
    messages,
    statusEmitter: statusEmitterRef.current,
    streamEmitter: streamEmitterRef.current,
    error: createSessionError ?? chatError,
    sendMessage: prepareSending,
    retrySendMessage: retrySendMessage,
  };
}
