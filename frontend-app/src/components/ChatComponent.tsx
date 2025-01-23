// frontend/src/components/ChatComponent.tsx
import React, { useEffect, useState } from 'react';
import { socketService } from '../services/socketService'; // Import the socketService

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [room, setRoom] = useState('room1'); // Example: room name

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() !== '') {
      socketService.sendMessage(room, message);  // Emit the message using socketService
      setMessage('');
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    socketService.listenForMessages((data: any) => {
      setChatMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Listen for document updates (optional for specific use cases)
    socketService.listenForDocumentUpdates((content: any) => {
      console.log('Document content updated:', content);
    });

    // Join the room once the component mounts
    socketService.joinRoom(room);

    // Cleanup on component unmount (disconnect from the server)
    return () => {
      socketService.disconnect();
    };
  }, [room]);

  return (
    <div>
      <h1>Chat Room: {room}</h1>

      <div>
        {chatMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
