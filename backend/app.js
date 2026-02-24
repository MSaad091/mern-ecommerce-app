
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
const app = express();

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/user", userRouter);
 
export { app };
