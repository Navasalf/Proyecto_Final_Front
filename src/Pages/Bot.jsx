import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function Chat() {
  const [userMessage, setUserMessage] = useState('');
  const [botMessage, setBotMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    setBotMessage(data.message);
    setShowModal(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <div className="chat-container">
        <h1>Chatea Conmigo</h1>
          <div className="logo"><img
            src="src/assets/img/logoOG.png"
            className="d-inline-block align-top mx-4"
            alt="Logo de la empresa"
          /></div>
        <div className="input-container">
          <input
            type="text"
            value={userMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="form-control rounded-pill"
          />
          <button onClick={handleSendMessage} className="btn btn-success rounded-pill ml-2">
            Enviar
          </button>
        </div>
        <div className="conversation-container">
          <p className="bot-message fw-bold">Bot:</p> <span>{botMessage}</span>
        </div>
      </div>
    </div>
  );
}

export default Chat;

