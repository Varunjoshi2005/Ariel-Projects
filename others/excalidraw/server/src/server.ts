import { Server, Socket } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

let users = {};

const StartServer = () => {
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  io.on("connection", (socket: Socket) => {
    console.log("New user connected", socket.id);

    socket.on("mousemove", (data) => {
      users[socket.id] = data;

      socket.broadcast.emit("remote-mousemove", {
        id: socket.id,
        cursor: data,
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });

  server.listen(4000, () => {
    console.log(`Server running on port : 4000`);
  });
};

StartServer();
