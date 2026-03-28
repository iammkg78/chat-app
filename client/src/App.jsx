import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setuserdata, clearuser } from "./redux/userslice.js";
import Home from "./pages/Home.jsx";
import usecurrentuser from "./customhooks/usecurrentuser.jsx";
import useOtherUsers from "./customhooks/getotheruser.jsx";
import Profile from "./pages/Profile.jsx";
import { io } from "socket.io-client";

function App() {
  usecurrentuser();
  useOtherUsers();

  const { userdata, loading } = useSelector((state) => state.user);

  useEffect(() => {

    if(!userdata) return;

     const socketio = io(
      "http://localhost:5500",
      { auth: { userid: userdata?._id } ,
       withCredentials: true} 
    );

    return ()=>{
      socketio.disconnect()
    }
  }, [userdata]);

  if (loading) return <h2>loading...</h2>;

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userdata ? <Signup /> : <Navigate to="/profile" />}
      />
      <Route
        path="/login"
        element={!userdata ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userdata ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={userdata ? <Profile /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App;
