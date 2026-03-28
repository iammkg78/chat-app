import mongoose from "mongoose";

const userschema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      url: { type: String  },
      public_id: { type: String },
      
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userschema);

export default User;
