// ✅ components/RoomSelector.jsx
import { useState } from 'react';
export default function RoomSelector({ username, onRoomSelect }) {
  const [room, setRoom] = useState('general');
  const handleSubmit = (e) => {
    e.preventDefault();
    onRoomSelect(room);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Welcome {username}</h2>
        <input className="border p-2 rounded w-full mb-4" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Enter Room Name" />
        <button className="bg-green-500 text-white py-2 px-4 rounded w-full">Join Room</button>
      </form>
    </div>
  );
}