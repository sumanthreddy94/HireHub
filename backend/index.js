import express from "express";
import dotenv from "dotenv";
 
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config({ path: "./config/config.env" });
app.use(cookieParser());

const FRONTEND_URL = "http://localhost:5173";

app.use(
  cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Only job seeker related routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);

dbConnection();

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

export default app;

import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import applicationRouter from "./routes/applicationRouter.js";

dotenv.config();

import express from 'express';

let capp = express();capp.use(express.json());
capp.use(cookieParser());
capp.use(cors({ origin: "http://localhost:3000", credentials: true }));

capp.use("/api/v1/applications", applicationRouter);

capp.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
capp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 
