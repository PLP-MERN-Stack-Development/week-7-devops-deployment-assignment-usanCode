
// 🟩 server.js (Enhanced for Tasks 2-5)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

// ✅ Add this route here
app.get('/', (req, res) => {
  res.send('🟢 Socket.IO Chat Server is running.');
});

//Add an error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// ✅ Use morgan for logging in production
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let users = {}; // socket.id -> { username, room }
let messages = {}; // roomName -> [messages]

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

 socket.on('join', ({ username, room }) => {
  users[socket.id] = { username, room };
  socket.join(room);

  if (!messages[room]) messages[room] = [];

  // ✅ Send existing chat history to the newly joined client
  socket.emit('message_history', messages[room]);

  // Notify others in the room
  socket.to(room).emit('message', {
    user: 'System',
    text: `${username} has joined the room`,
    timestamp: new Date().toLocaleTimeString(),
  });

  // Send updated user list
  io.in(room).emit('user_list', getUsersInRoom(room));
});


  socket.on('message', ({ room, text }) => {
    const { username } = users[socket.id] || {};
    const msg = {
      user: username,
      text,
      timestamp: new Date().toLocaleTimeString(),
    };
    messages[room].push(msg);
    io.to(room).emit('message', msg);
  });

  socket.on('private_message', ({ toSocketId, message }) => {
    const from = users[socket.id]?.username || 'Anonymous';
    const timestamp = new Date().toLocaleTimeString();
    io.to(toSocketId).emit('private_message', { from, message, timestamp });
  });

  socket.on('typing', (room) => {
    const user = users[socket.id]?.username;
    socket.to(room).emit('typing', user);
  });

  socket.on('disconnect', () => {
    const { username, room } = users[socket.id] || {};
    if (room) {
      socket.to(room).emit('message', {
        user: 'System',
        text: `${username} has left the room`,
        timestamp: new Date().toLocaleTimeString(),
      });
      delete users[socket.id];
      io.to(room).emit('user_list', getUsersInRoom(room));
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

function getUsersInRoom(room) {
  return Object.entries(users)
    .filter(([_, u]) => u.room === room)
    .map(([id, u]) => ({ socketId: id, username: u.username }));
}

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});




