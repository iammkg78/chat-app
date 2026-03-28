import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setuserdata } from "../redux/userslice.js";
import { useDispatch } from "react-redux";

function Login() {
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function handleinputchange(e) {
    setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handlesubmit(e) {
    e.preventDefault();

    const { email, password } = formdata;

    if (!email || !password) {
      alert("fill all feild");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5500/api/auth/login",
        formdata,
        { withCredentials: true },
      );


       dispatch(setuserdata(response?.data))
       navigate("/")
        

       setformdata({email:"",password:""})

    } catch (error) {
      console.log("eror login eror")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-gray-500 mt-3">
            Login to continue your conversations
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handlesubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              
              value={formdata.email}
              onChange={handleinputchange}
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
               value={formdata.password}
              onChange={handleinputchange}
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Don’t have an account?
          <span
            className="text-indigo-600 font-semibold cursor-pointer hover:underline ml-1"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
