import React, { useEffect, useState } from "react";
import formCss from "../form/form.module.css"
export default function MyMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState({ name: "", phone: "", message: "" });

  // Traer mensajes al montar
  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  // Enviar mensaje y actualizar lista local
  const handleSendMessage = async () => {
    if (!newMessage.name || !newMessage.phone || !newMessage.message) return alert("Completa todos los campos");

    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    });

    if (response.ok) {
      const savedMessage = await response.json();
      setMessages(prev => [...prev, savedMessage]);
      setNewMessage({ name: "", phone: "", message: "" });
    } else {
      alert("Error al enviar el mensaje");
    }
  };

  return (
    <div className={formCss.formStyle}>
      <h2>Mis Mensajes</h2>
      {loading ? <p>Cargando mensajes...</p> : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>
              <strong>{msg.name}</strong>: {msg.message} <br />
              <span>Teléfono: {msg.phone}</span>
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        placeholder="Nombre"
        value={newMessage.name}
        onChange={e => setNewMessage({ ...newMessage, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={newMessage.phone}
        onChange={e => setNewMessage({ ...newMessage, phone: e.target.value })}
      />
      <textarea
        placeholder="Mensaje"
        value={newMessage.message}
        onChange={e => setNewMessage({ ...newMessage, message: e.target.value })}
      />
      <button onClick={handleSendMessage}>Enviar Mensaje</button>
    </div>
  );
}

