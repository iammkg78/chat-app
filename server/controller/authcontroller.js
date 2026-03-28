import User from "../model/usermodel.js";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        msg: "provide all credential",
      });
    }

    const finduser = await User.findOne({ email });

    if (finduser) {
      return res
        .status(400)
        .json({ success: false, msg: "user already exist" });
    }

    if (password.length < 5) {
      return res.status(400).json({ msg: "password should be of 6 char.." });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedpassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "signup error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    if(!password || !email){
      return res.status(400).json({mess:"provide all neccasary feilds"})
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: " user wont exist" });
    }

    
    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
      return res.status(400).json({ msg: "password is not correct" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res
      .status(200)
      .json({ _id: user._id, username: user.username, email: user.email });
  } catch (error) {
    return res.status(500).json({ msg: "login error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ msg: "logout succesfully" });
  } catch (error) {
    return res.status(500).json({ msg: "logout error" });
  }
};
