import express from "express";
import isAuth from "../middleware/auth.js";
import {
  currentuser,
  
  getotherusers
} from "../controller/usercontroller.js";
import upload from "../middleware/multer.js";

const userrouter = express.Router();

userrouter.get("/current-user", isAuth, currentuser);
userrouter.get("/otherusers", isAuth, getotherusers);

// userrouter.patch(
//   "/profile-image",
//   isAuth,
//   upload.single("profileimage"),
//   createprofileimage,
// );

export default userrouter;
