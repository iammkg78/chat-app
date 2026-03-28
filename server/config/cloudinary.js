import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

const uploadcloudinary = async (filepath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(filepath, {
      folder: "chat_app/profile_images",
    });

    fs.unlinkSync(filepath)

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    fs.unlinkSync(filepath)
    console.log(error);
  }
};

export default uploadcloudinary;
