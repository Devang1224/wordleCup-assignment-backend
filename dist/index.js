"use strict";
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'https://wordle-cup-assignment.vercel.app/',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'https://wordle-cup-assignment.vercel.app/',
        methods: ['GET', 'POST']
    }
});
const roomname = 'chat-room';
server.listen(3000, () => {
    console.log('server is running');
});
io.on('connection', (socket) => {
    socket.join(roomname);
    socket.on('send-message', (data) => {
        io.to(roomname).emit('user-message', data);
    });
});
