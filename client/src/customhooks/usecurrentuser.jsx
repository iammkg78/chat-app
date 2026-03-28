import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setuserdata } from "../redux/userslice.js";

function usecurrentuser() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getuser() {
      try {
        const res = await axios.get("http://localhost:5500/api/current-user", {
          withCredentials: true,
        });

        dispatch(setuserdata(res.data));
      } catch (error) {
        dispatch(setuserdata(null));
      }finally{
        dispatch(setloading(false));
      }
    }

    getuser();
  }, [dispatch]);
}

export default usecurrentuser;
