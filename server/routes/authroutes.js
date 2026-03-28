
import express  from "express"
import { login, logout, signup } from "../controller/authcontroller.js"

const authrouter = express.Router()



authrouter.route("/signup").post(signup).all((req, res) => {
    return res.status(405).json({ message: "Method not allowed" });
})

authrouter.post("/login",login)
authrouter.get("/logout",logout)



export default authrouter