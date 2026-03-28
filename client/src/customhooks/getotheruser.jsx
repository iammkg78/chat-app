import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setotherusers } from "../redux/userslice";

const useOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5500/api/otherusers",
          { withCredentials: true }
        );

        dispatch(setotherusers(res.data));
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        dispatch(setotherusers([])); // better than null
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useOtherUsers;