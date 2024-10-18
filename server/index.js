import express from "express";
import dotennv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/AuthRoute.js";

dotennv.config();

const app = express();
const port = process.env.PORT || 3001;
const dbUrl = process.env.DATABASE_URL;

app.use(cors({
  origin:process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true, //enable cookies
}));
app.use(cookieParser()); //to read cookie frrom frontend

app.use(express.json());

app.use("/api/auth", authRouter);

const server = app.listen(port, () => {
  console.log(`Server is running at port :${port}`);
});

mongoose
  .connect(dbUrl)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err.message));
