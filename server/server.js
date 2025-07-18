
// 🟩 server.js (Enhanced for Tasks 2-5)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Add this route here
app.get('/', (req, res) => {
  res.send('🟢 Socket.IO Chat Server is running.');
});

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




/*

// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users and messages
const users = {};
const messages = [];
const typingUsers = {};

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining
  socket.on('user_join', (username) => {
    users[socket.id] = { username, id: socket.id };
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    console.log(`${username} joined the chat`);
  });

  // Handle chat messages
  socket.on('send_message', (messageData) => {
    const message = {
      ...messageData,
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
    };
    
    messages.push(message);
    
    // Limit stored messages to prevent memory issues
    if (messages.length > 100) {
      messages.shift();
    }
    
    io.emit('receive_message', message);
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    if (users[socket.id]) {
      const username = users[socket.id].username;
      
      if (isTyping) {
        typingUsers[socket.id] = username;
      } else {
        delete typingUsers[socket.id];
      }
      
      io.emit('typing_users', Object.values(typingUsers));
    }
  });

  // Handle private messages
  socket.on('private_message', ({ to, message }) => {
    const messageData = {
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
    };
    
    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const { username } = users[socket.id];
      io.emit('user_left', { username, id: socket.id });
      console.log(`${username} left the chat`);
    }
    
    delete users[socket.id];
    delete typingUsers[socket.id];
    
    io.emit('user_list', Object.values(users));
    io.emit('typing_users', Object.values(typingUsers));
  });
});

// API routes
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

// Root route
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io }; */