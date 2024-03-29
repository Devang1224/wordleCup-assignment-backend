
const express = require('express')
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config()
const app = express();

const cors = require('cors');

const corsOptions ={
    origin:'*', 
    credentials:true,           
}
app.use(cors(corsOptions));
app.use(express.json());


const server = http.createServer(app);

const io = socketIo(server,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Access-Control-Allow-Origin']
      }
});

//http://localhost:5173
//https://wordle-cup-assignment.vercel.app/


interface userData{
    username:string,
    message:string,
    userId:string,
    userIcon:string,
    userColor:string
}

const roomname:string = 'chat-room';
const PORT = process.env.PORT || 6010;


server.listen(PORT, () => {
    console.log('server is running');
})


io.on('connection', (socket:any) => {


socket.join(roomname);

    socket.on('send-message',(data:userData)=>{
        io.to(roomname).emit('user-message',data)
    })
})
