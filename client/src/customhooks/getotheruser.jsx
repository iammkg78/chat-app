import axios from "axios";
import React, { useEffect } from "react";
import { setotherusers } from "../redux/userslice.js";
import { useDispatch, useSelector } from "react-redux";

function getotheruser() {
  const dispatch = useDispatch();

  const { userdata } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/otherusers", {
          withCredentials: true,
        });

        dispatch(setotherusers(res.data));
      } catch (error) {
        dispatch(setotherusers(null));
      }
    };

    fetchUsers();
  }, [userdata]);
}

export default getotheruser;
