
// components/PrivateChat.jsx
import { useEffect, useState, useRef } from 'react';
import { socket } from '../socket/api';

export default function PrivateChat({ username, targetUser, goBack }) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const listener = ({ from, message, timestamp }) => {
      if (from === targetUser.username) {
        setChat((prev) => [...prev, { from, message, timestamp }]);
      }
    };
    socket.on('private_message', listener);

    return () => socket.off('private_message', listener);
  }, [targetUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const msg = {
      toSocketId: targetUser.socketId,
      message,
    };
    socket.emit('private_message', msg);
    setChat((prev) => [
      ...prev,
      { from: username, message, timestamp: new Date().toLocaleTimeString() },
    ]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-white border-b shadow flex justify-between items-center">
        <h2 className="text-lg font-bold">Private Chat with {targetUser.username}</h2>
        <button className="text-sm text-blue-500" onClick={goBack}>← Back</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md max-w-xs ${
              msg.from === username ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-300 text-black'
            }`}
          >
            <div className="text-sm font-semibold">{msg.from}</div>
            <div>{msg.message}</div>
            <div className="text-xs text-right">{msg.timestamp}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type your private message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
