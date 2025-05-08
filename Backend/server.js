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
  },
});
io.on("connection", (socket) => {
  console.log("user connected User", socket.id);

  socket.on("join-shop-room", (shopId) => {
    socket.join();
    const menu = shopMenus[`shop_${shopId}`] || [];
    socket.emit("menuUpdate", menu);
  });
});

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server is running on port 5000");
  connectDB();
});
