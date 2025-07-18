
// ✅ components/Login.jsx
import { useState } from 'react';
export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onLogin(name);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4">Enter your username</h2>
        <input className="border p-2 rounded w-full mb-4" value={name} onChange={e => setName(e.target.value)} placeholder="Username" />
        <button className="bg-blue-500 w-full text-white py-2 rounded">Join</button>
      </form>
    </div>
  );
}