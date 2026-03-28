

import express from "express"
import isAuth from "../middleware/auth.js"
import { createconversation, createmessage, getconversationmessage } from "../controller/messagecontroller.js"

const messagerouter = express.Router()

messagerouter.post("/createconversation",isAuth,createconversation)
messagerouter.post("/createmessages",isAuth,createmessage)
messagerouter.get("/getmessages/:conversationId",isAuth,getconversationmessage)

export default messagerouter