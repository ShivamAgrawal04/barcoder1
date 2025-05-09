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
  },
});

<<<<<<< HEAD
// Make io accessible globally
global.io = io;

// io.use((socket, next) => {
//   try {
//     const rawCookie = socket.handshake.headers.cookie;
//     if (!rawCookie) return next(new Error("No cookies found"));

//     const cookies = cookie.parse(rawCookie);
//     const token1 = cookies.token; // Use your actual cookie name here

//     const decoded = jwt.verify(token1, process.env.JWT_SECRET);
//     if (decoded) {
//       socket.user = decoded; // Attach the user data to the socket object

//       next(); // Allow the connection
//     } else {
//       next(new Error("Authentication failed"));
//     }
//   } catch (err) {
//     next(new Error("Authentication failed"));
//   }
// });

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Join a room based on shop ID
  socket.on("joinShop", (shopId) => {
    socket.join(shopId);
    console.log(`User joined shop room: ${shopId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
=======
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
>>>>>>> be126c00f1838f86cc1a268695c610694785ebde
  });
});

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", process.env.PORT);
  connectDB();
});
