import express from "express";
import cors from "cors";

import "dotenv/config";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.29.234:3000",
      "https://barcoder1.vercel.app",
    ],
    credentials: true,
  })
);

// Optional: handle preflight manually
// app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

export default app;
