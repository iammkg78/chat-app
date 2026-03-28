 dotenv.config()
 import express from "express";
import connectdb from "./config/connect.js";
import authrouter from "./routes/authroutes.js";
import cors from "cors"
import userRouter from "./routes/userroutes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import messagerouter from "./routes/messageroutes.js";
import path from "path";
import { fileURLToPath } from "url";

import {app,server} from "./socket/socket.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({origin:"https://chat-app-s226.onrender.com/",credentials:true}))

app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get(/^\/(?!api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use("/api/auth",authrouter)
app.use("/api",userRouter)
app.use("/api/user",messagerouter) 
 
 
const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
   connectdb()
  console.log(`server started on port ${PORT}...`);
});
