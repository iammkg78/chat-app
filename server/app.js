 dotenv.config()
 import express from "express";
import connectdb from "./config/connect.js";
import authrouter from "./routes/authroutes.js";
import cors from "cors"
import userRouter from "./routes/userroutes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import messagerouter from "./routes/messageroutes.js";

import {app,server} from "./socket/socket.js"
 

 

app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use(express.json())
app.use(cookieParser())

 

app.use("/api/auth",authrouter)
app.use("/api",userRouter)
app.use("/api/user",messagerouter) 
 
 
server.listen(5500, () => {
   connectdb()
  console.log("server started...");
});
