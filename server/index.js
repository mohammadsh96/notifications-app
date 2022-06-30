import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { 
  cors: {
  origin: "http://localhost:3030",
  methods: ["GET", "POST"],
}, });

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendlike", ({ senderName, recivedName, type }) => {
    const receiver = getUser(recivedName);
    
   
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });
  socket.on("sendtext", ({ senderName, recivedName, text }) => {
    const receiver = getUser(recivedName);
    
   
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      text,
    });
  });

  socket.on("disconnect", ()=>{
    removeUser(socket.id)
  })
});


httpServer.listen(4000 ,()=> {


  console.log("it is running");
});