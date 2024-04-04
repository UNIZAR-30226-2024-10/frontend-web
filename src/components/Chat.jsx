import React, { useState, useEffect, useRef, useContext } from "react";
import './../styles/Chat.css'
import { SocketContext } from './../context/socket';

function Chat({ roomId }) {
  const socket = useContext(SocketContext);
  const [value, setValue] = useState(''); // Mensaje a enviar
  const [message, setMessage] = useState([]);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const handleChatMessage = (data) => {
      receiveMessage(data);
    };

    if (socket) {
      socket.on('chat message', handleChatMessage);
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

      return () => {
        socket.off('chat message', handleChatMessage);
      };
    }
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { // Construcción del mensaje a enviar
      body: value,  // Contenido del mensaje
      from: 'Me' // Emisor del mensaje
    };
    
    if (value) {
      setMessage([...message, newMessage]); // Añade el nuevo mensaje a la lista de mensajes
      socket.emit('chat message', { roomId: roomId, body: value, from: socket.id }); // Envía el mensaje creado a través del socket con un evento de tipo 'chat message' 
      inputRef.current.value = ''; // Vacía el input
      setValue('');
    }
  };

  function receiveMessage(msg) {
    console.log(msg);
    setMessage(state => [...state, msg]);
  }

  return (
    <div className="chat">
      <ul id="messages" ref={chatContainerRef}>  { /* Muestra los mensajes en forma de lista */ }
        {message && message.slice().reverse().map((msg, i) => (
          <li key={i} className={msg.from === "Me" ? "me" : "them"}>
            {msg.body}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="form">
        <input className="input"
          type="text" 
          placeholder="Escribe un mensaje" 
          autoComplete="off"
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)} /* Se construye el mensaje a enviar */
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Chat;
