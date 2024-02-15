
const express = require('express')
const http = require('http');
const socketIo = require('socket.io');
const app = express();

const cors = require('cors');

const corsOptions ={
    origin:'https://wordle-cup-assignment.vercel.app/', 
    credentials:true,           
}
app.use(cors(corsOptions));
app.use(express.json());


const server = http.createServer(app);

const io = socketIo(server,{
    cors: {
        origin: 'https://wordle-cup-assignment.vercel.app/',
        methods: ['GET', 'POST']
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


server.listen(3000, () => {
    console.log('server is running');
})


io.on('connection', (socket:any) => {


socket.join(roomname);

    socket.on('send-message',(data:userData)=>{
        io.to(roomname).emit('user-message',data)
    })
})
