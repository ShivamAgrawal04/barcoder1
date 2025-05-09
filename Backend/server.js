import app from "./index.js";
import connectDB from "./config/db.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://192.168.29.234:3000",
      "https://barcoder1.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// ✅ Define globalreq AFTER io is initialized
// global.globalreq = global.globalreq || {};
global.io = io;



io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  socket.on("join-room", (shopId) => {
    socket.join(shopId);
    console.log(`🔗 User joined room: ${shopId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", process.env.PORT);
  connectDB();
});
