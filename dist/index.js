"use strict";
const { Server } = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
const roomname = 'chat-room';
server.listen(3000, () => {
    console.log('server is running');
});
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});
io.on('connection', (socket) => {
    socket.join(roomname);
    socket.on('send-message', (data) => {
        io.to(roomname).emit('user-message', data);
    });
});
