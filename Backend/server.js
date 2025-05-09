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

global.io = io;

// global.io = io;

// Save io globally

io.use((socket, next) => {
  try {
    const rawCookie = socket.handshake.headers.cookie;
    if (!rawCookie) return next(new Error("No cookies found"));

    const cookies = cookie.parse(rawCookie);
    const token1 = cookies.token; // Use your actual cookie name here

    const decoded = jwt.verify(token1, process.env.JWT_SECRET);
    if (decoded) {
      socket.user = decoded; // Attach the user data to the socket object

      next(); // Allow the connection
    } else {
      next(new Error("Authentication failed"));
    }
  } catch (err) {
    next(new Error("Authentication failed"));
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const shopUserId = socket.user.id;

  socket.join(shopUserId);
  console.log("userJoined room", shopUserId);

  // socket.on("error", (error) => {
  //   console.error("Socket error:", error);
  // });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });
});

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", process.env.PORT);
  connectDB();
});
