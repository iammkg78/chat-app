import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const OnlineUsers = {};

io.on("connection", (socket) => {
  const userid = socket.handshake.auth?.userid;

  if (userid) {
    OnlineUsers[userid] = socket.id;
  }

  

  socket.on("disconnect", () => {
    delete OnlineUsers[userid];
    console.log("user disconnected:", userid);
  });
});

export { app, server };
