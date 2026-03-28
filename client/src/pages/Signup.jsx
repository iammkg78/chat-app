import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formdata, Setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleinputchange(e) {
    Setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handlesubmit() {
    const { username, email, password } = formdata;

    if (!username || !email || !password) {
      alert("fill all feilds");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5500/api/auth/signup",formdata,
        { withCredentials: true },
      );

     navigate("/login")
     Setformdata({username:"",password:"",email:""})
    } catch (error) {
      console.log(error?.response?.data);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="username"
               value={formdata.username}
              onChange={handleinputchange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
               value={formdata.email}
              onChange={handleinputchange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
               value={formdata.password}
              onChange={handleinputchange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handlesubmit}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?
          <span
            className="text-indigo-500 font-medium cursor-pointer hover:underline ml-1"
            onClick={() => navigate("/login")}
          >
            login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
