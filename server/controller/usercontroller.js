// import uploadcloudinary from "../config/cloudinary.js";
import User from "../model/usermodel.js";

export const currentuser = async (req, res) => {
  try {
    const id = req.userid;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// export async function createprofileimage(req, res) {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded",
//       });
//     }

//     const id = req.userid;

//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(401).json({ mess: "unauthorized" });
//     }

//     const image = await uploadcloudinary(req.file.path);

//     user.profileImage = {
//       url: image?.secure_url,
//       public_id: image?.public_id,
//     };

//     await user.save();

//     return res.status(200).json({ mess: "image uploaded succesfully", user });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ mess: "create profileimagerror" });
//   }
// }

export async function getotherusers(req, res) {
  try {
    const id = req.userid;

     

    const checkuser = await User.findById(id);

    if (!checkuser) {
      return res.status(401).json({ mess: "unauthorized.." });
    }

    const users = await User.find({ _id: { $ne: id } }).select("-password");

    return res.status(200).json( users );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mess: "get other user error" });
  }
}
