
import express  from "express"
import { login, logout, signup } from "../controller/authcontroller.js"

const authrouter = express.Router()

authrouter.post("/signup",signup)
authrouter.post("/login",login)
authrouter.get("/logout",logout)


export default authrouter