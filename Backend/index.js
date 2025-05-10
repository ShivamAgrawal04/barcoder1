import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import "dotenv/config";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.29.138:3000",
      "https://barcoder1.vercel.app",
    ],
    credentials: true,
  })
);

// Optional: handle preflight manually
// app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;
