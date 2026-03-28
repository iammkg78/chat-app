import React from "react";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setSelectedUser,setConversationid  } from "../redux/messageslice.js";
import axios from "axios";

function Sidebar() {
  const { userdata, otherusers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleclick(user) {
    try {
      const res = await axios.post(
        "http://localhost:5500/api/user/createconversation",
        { recieverId: user._id },
        { withCredentials: true },
      );

      const conversationid = res.data._id;

       

      const messages = await axios.get(
        `http://localhost:5500/api/user/getmessages/${conversationid}`,
        { withCredentials: true },
      );
 

      dispatch(setConversationid(conversationid))
      dispatch(setSelectedUser(user))
      dispatch(setMessages(messages.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-1/4 h-screen bg-white border-r-2 border-gray-200 flex flex-col">
      {/* Top Section */}
      <div className="px-2 py-5 border-b border-gray-100 flex flex-col   ">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 ">Chats</h2>

          <div>
            <img src={dp} alt="image" className="w-12 h-12 rounded-full " />
          </div>
        </div>

        <div className="text-left">
          <button className="mt-3 pr-1.5 cursor-pointer px-1.5 bg-gray-900 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            Group+
          </button>
        </div>
      </div>

      {/* Users List (Backend Data Will Map Here) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {otherusers &&
          otherusers.length !== 0 &&
          otherusers?.map((user) => (
            <div
              onClick={() => handleclick(user)}
              key={user.username}
              className="px-3 py-3 rounded-lg cursor-pointer hover:bg-gray-300 transition flex items-center gap-2  border border-gray-100"
            >
              <img src={dp} alt="image" className="w-10 h-10 rounded-full" />
              <h2 className="text-gray-700 hover:text-white">
                {user.username}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
