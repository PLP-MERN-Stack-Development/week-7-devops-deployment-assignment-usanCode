// ✅ components/UserList.jsx
export default function UserList({ users, onPrivate }) {
  return (
    <div className="w-1/4 p-2 border-r border-gray-300">
      <h3 className="font-semibold mb-2">Online Users</h3>
      {users.map((u) => (
        <div key={u.socketId} className="mb-1 flex justify-between items-center">
          <span>{u.username}</span>
          <button className="text-blue-500 text-sm" onClick={() => onPrivate(u)}>Message</button>
        </div>
      ))}
    </div>
  );
}