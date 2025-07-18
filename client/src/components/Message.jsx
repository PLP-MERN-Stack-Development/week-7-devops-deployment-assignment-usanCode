

// ✅ components/Message.jsx
export default function Message({ msg, isOwn }) {
  return (
    <div className={`p-2 rounded-lg max-w-xs ${isOwn ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}>
      <div className="text-sm font-semibold">{msg.user}</div>
      <div>{msg.text}</div>
      <div className="text-xs text-right">{msg.timestamp}</div>
    </div>
  );
}

