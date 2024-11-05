import {Server as SocketIOServer} from "socket.io"

const setupSocket=(server)=>{
   
    const io=new SocketIOServer(server,{   //server creation
        cors:{
            origin:process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true, //enable cookies
          },
    });
     
  const userSocketMap=new Map();

  const disconnect=(socket)=>{
    console.log(`Client Disconnected: ${socket.id}`)
    for(const [userId,socketId] of userSocketMap.entries()){             //const [userId,socketId]   array destructured userid ki value userID me aur socketId ki value socketId me 
        if(socketId===socket.id){
            userSocketMap.delete(userId);
            break;
        }
    }
  }

  io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;

    if(userId){
        userSocketMap.set(userId,socket.id);
        console.log(`User Connected: ${userId} with SocketId:${socket.id}`)
    }else{
        console.log("UserId not provided during connection.")
    }
    socket.on("disconnect",()=>disconnect(socket))
  })


}


export default setupSocket;