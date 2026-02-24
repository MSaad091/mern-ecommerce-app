
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
const app = express();



app.use(cors({
  origin: [
    "https://mern-ecommerce-app-swrd.vercel.app", //adminpanel
    "https://mern-ecommerce-app-psi.vercel.app" // frontend
  ],
  credentials: true
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/user", userRouter);
 
export { app };
