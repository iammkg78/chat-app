import React from "react";
import dp from "../assets/dp.webp";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setuserdata } from "../redux/userslice.js";

function Profile() {
  const dispatch = useDispatch();
  const[saving,setsaving] = useState(false)
  const { userdata } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [frontentimage, setfrontentimage] = useState(
    userdata?.profileImage?.url || dp,
  );
  const [backendimage, setbackendimage] = useState(null);

  async function handleupload(e) {
    e.preventDefault();

    
    if (!backendimage) return;

    const formdata = new FormData();

    formdata.append("profileimage", backendimage);
setsaving(true)
    try {
      const res = await axios.patch(
        "http://localhost:5500/api/profile-image",
        formdata,
        { withCredentials: true },
      );

      setsaving(false)

      console.log(res.data)
    } catch (error) {
      console.log(error?.response);
       setsaving(false)
    }
  }

  function handlechange(e) {
    const file = e.target.files[0];

    setbackendimage(file);
    setfrontentimage(URL.createObjectURL(file));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="absolute top-10 left-15">
        <IoMdArrowRoundBack
          className="text-blue-500 cursor-pointer"
          size={30}
          onClick={() => navigate("/")}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>

        <div className="relative w-32 h-32 mb-6">
          <img
            src={frontentimage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
          />
          {/* Edit icon overlay */}
          <div className="absolute bottom-0 right-0 bg-blue-300 rounded-full p-2 cursor-pointer shadow-lg">
            <label
              htmlFor="file-input"
              className="cursor-pointer text-white text-sm font-semibold"
            >
              ✏️
            </label>
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handlechange}
            />
          </div>
        </div>

        {/* User Info Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleupload}>
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Email Input (readonly) */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="text"
              placeholder="user@example.com"
              readOnly
              className="border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Optional submit button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
          >
            {saving ? "saving...":"save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
