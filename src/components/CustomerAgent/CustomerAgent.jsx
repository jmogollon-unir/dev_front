import { useEffect, useRef, useState } from "react";
import { useCustomerAgent } from "../../hooks/useCustomerAgent";
import "./CustomerAgent.css";

const QUICK_PROMPTS = [
  "Recomiéndame un libro de fantasía",
  "Busco una novela clásica",
  "¿Qué libro puedo regalar?",
];

const STATUS_LABEL = {
  connected: "Conectado",
  connecting: "Conectando",
  disconnected: "Sin conexión",
  streaming: "Escribiendo"
};

export default function CustomerAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { status, messages, sendMessage, clearMessages, reconnect } = useCustomerAgent();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (sendMessage(message)) {
      setMessage("");
    }
  };

  const handleQuickPrompt = (prompt) => {
    setIsOpen(true);
    sendMessage(prompt);
  };

  return (
    <section className="customer-agent" aria-label="Agente de atención al cliente">
      {isOpen && (
        <div className="customer-agent-panel">
          <header className="customer-agent-header">
            <div>
              <strong>Agente Relatos</strong>
              <span className={`agent-status agent-status-${status}`}>
                <span aria-hidden="true" />
                {STATUS_LABEL[status] || STATUS_LABEL.disconnected}
              </span>
            </div>
            <div className="customer-agent-actions">
              <button type="button" onClick={clearMessages} aria-label="Limpiar conversación">
                <i className="bi bi-arrow-counterclockwise" />
              </button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar agente">
                <i className="bi bi-x-lg" />
              </button>
            </div>
          </header>

          <div className="customer-agent-messages">
            {messages.map((item) => (
              <div key={item.id} className={`agent-message agent-message-${item.role}`}>
                {item.text || <span className="agent-typing">...</span>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="customer-agent-prompts">
            {QUICK_PROMPTS.map((prompt) => (
              <button key={prompt} type="button" onClick={() => handleQuickPrompt(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form className="customer-agent-form" onSubmit={handleSubmit}>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Pregunta por recomendaciones"
              disabled={status === "streaming"}
            />
            <button type="submit" disabled={!message.trim() || status === "streaming"} aria-label="Enviar mensaje">
              <i className="bi bi-send-fill" />
            </button>
          </form>

          {status === "disconnected" && (
            <button type="button" className="agent-reconnect" onClick={reconnect}>
              Reconectar
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        className="customer-agent-fab"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-label={isOpen ? "Cerrar agente" : "Abrir agente"}
      >
        <i className={isOpen ? "bi bi-x-lg" : "bi bi-chat-dots-fill"} />
      </button>
    </section>
  );
}
