import app from "./index.js";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://192.168.29.138:3000",
      "https://barcoder1.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

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

const gracefulShutdown = async () => {
  console.log("Received shutdown signal");
  server.close(() => {
    console.log("server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

server.listen(process.env.PORT, "0.0.0.0", async () => {
  console.log("🚀 Server running on port", process.env.PORT);
  await connectDB();
});
