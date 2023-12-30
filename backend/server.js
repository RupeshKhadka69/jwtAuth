import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/mongodb.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
import userRoutes from './userRoute/userRoute.js'
connectDB();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use("/api/users", userRoutes)
app.use(notFound);
app.use(errorHandler)
app.get("/", (req, res) => {
  res.json({ message: "running" })
});

app.listen(port || 5000, () => {
  console.log(`backend is running on port ${port}`);
});
