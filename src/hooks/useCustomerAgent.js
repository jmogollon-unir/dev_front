import { useCallback, useEffect, useRef, useState } from "react";
import { buildWebSocketUrl } from "../config/api";

const CHAT_PATH = "/ws-api/v1/communications/chat";

export function useCustomerAgent() {
  const socketRef = useRef(null);
  const activeMessageIdRef = useRef(null);
  const [status, setStatus] = useState("connecting");
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "agent",
      text: "Hola, soy el agente de Relatos de Papel. ¿Qué lectura estás buscando?"
    }
  ]);

  const appendAgentChunk = useCallback((chunk) => {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === activeMessageIdRef.current
          ? { ...message, text: `${message.text}${chunk}` }
          : message
      )
    );
  }, []);

  const addMessage = useCallback((role, text) => {
    const id = crypto.randomUUID();
    setMessages((currentMessages) => [...currentMessages, { id, role, text }]);
    return id;
  }, []);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setStatus("connecting");
    const socket = new WebSocket(buildWebSocketUrl(CHAT_PATH));
    socketRef.current = socket;

    socket.onopen = () => setStatus("connected");
    socket.onclose = () => setStatus("disconnected");
    socket.onerror = () => setStatus("disconnected");
    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        if (response.type === "chunk") {
          appendAgentChunk(response.content || "");
        }

        if (response.type === "done") {
          activeMessageIdRef.current = null;
          setStatus("connected");
        }

        if (response.type === "error") {
          appendAgentChunk(response.content || "No pude responder en este momento.");
          activeMessageIdRef.current = null;
          setStatus("connected");
        }
      } catch {
        appendAgentChunk(event.data);
      }
    };
  }, [appendAgentChunk]);

  useEffect(() => {
    const connectTimer = window.setTimeout(connect, 0);

    return () => {
      window.clearTimeout(connectTimer);
      socketRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback(
    (text) => {
      const cleanText = text.trim();
      if (!cleanText) {
        return false;
      }

      if (socketRef.current?.readyState !== WebSocket.OPEN) {
        connect();
        addMessage("agent", "Estoy reconectando con el agente. Intenta de nuevo en unos segundos.");
        return false;
      }

      addMessage("user", cleanText);
      activeMessageIdRef.current = addMessage("agent", "");
      setStatus("streaming");
      socketRef.current.send(JSON.stringify({ message: cleanText }));
      return true;
    },
    [addMessage, connect]
  );

  const clearMessages = useCallback(() => {
    activeMessageIdRef.current = null;
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "agent",
        text: "Hola, soy el agente de Relatos de Papel. ¿Qué lectura estás buscando?"
      }
    ]);
  }, []);

  return {
    status,
    messages,
    sendMessage,
    clearMessages,
    reconnect: connect
  };
}
