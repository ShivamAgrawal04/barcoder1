import express from "express";
import cors from "cors";

import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.29.138:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server is running on port 5000");
  connectDB();
});
