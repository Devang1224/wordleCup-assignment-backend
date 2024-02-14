const {Server} = require('socket.io')
const express = require('express')
const http = require('http');
const cors = require('cors')

const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());

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

const io = new Server(server, {
    cors:{
        origin:'http://localhost:5173'
    }
});

io.on('connection', (socket:any) => {


socket.join(roomname);

    socket.on('send-message',(data:userData)=>{
 
        io.to(roomname).emit('user-message',data)

    })
})
