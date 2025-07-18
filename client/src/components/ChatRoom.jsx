
// components/ChatRoom.jsx
import { useState, useEffect, useRef } from 'react';
import { socket } from '../socket/api';
import Message from './Message';
import UserList from './UserList';

export default function ChatRoom({ username, room }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log('Emitting join:', { username, room });
    socket.emit('join', { username, room });

    socket.on('message', (msg) => {
      console.log('Received message:', msg);
      setChat((prev) => [...prev, msg]);
    });

    socket.on('message_history', (msgs) => setChat(msgs));

    socket.on('typing', (user) => {
      if (user !== username) {
        setTypingUser(user);
        setTimeout(() => setTypingUser(''), 1000);
      }
    });

    socket.on('user_list', (users) => {
      console.log('Users in room:', users);
      setUsers(users);
    });

    return () => {
      console.log('Disconnecting socket');
      socket.off('message');
      socket.off('message_history');
      socket.off('typing');
      socket.off('user_list');
      socket.disconnect();
    };
  }, [username, room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { room, text: message });
      setMessage('');
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', room);
  };

  const handlePrivateMessage = (user) => {
    const text = prompt(`Send private message to ${user.username}`);
    if (text) {
      socket.emit('private_message', { toSocketId: user.socketId, message: text });
      alert('Private message sent.');
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <UserList users={users} onPrivate={handlePrivateMessage} />
      <div className="flex-1 flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-2">Room: {room}</h2>
        <div className="flex-1 overflow-y-auto flex flex-col space-y-2">
          {chat.map((msg, idx) => (
            <Message key={idx} msg={msg} isOwn={msg.user === username} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        {typingUser && (
          <p className="text-sm italic text-gray-500">{typingUser} is typing...</p>
        )}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type your message..."
            className="flex-1 border p-2 rounded"
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
