import React, { useEffect, useState } from "react";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages, addMessage } from "../redux/messageslice.js"; // ✅ added addMessage
import { getSocket } from "../socket/socket.js";

function Messages() {
  const [text, settext] = useState("");

  const dispatch = useDispatch();
  const { userdata } = useSelector(state => state.user);
  const { selecteduser, messages, conversationId } = useSelector(
    (state) => state.messages,
  );

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handleReceiveMessage = (message) => {
      dispatch(addMessage(message)); // ✅ FIXED (no prev issue)
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [dispatch]);

  async function handlemessagesend() {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5500/api/user/createmessages",
        { text, conversationId },
        { withCredentials: true }
      );

      dispatch(setMessages([...messages, res.data]));

      settext("");

      const socket = getSocket();

      if (socket) {
        socket.emit("send_message", {
          ...res.data,
          receiverId: selecteduser._id,
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" w-3/4 flex-1 h-screen flex flex-col bg-gray-50">
      {selecteduser ? (
        <>
          <div className="h-16 px-6 flex items-center border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <img src={dp} alt="profile" className="w-10 h-10 rounded-full" />
              <h2 className="text-lg font-semibold text-gray-800">
                {selecteduser?.username}
              </h2>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages &&
              messages.map((message, index) => {

                const isMyMessage = message.senderId === userdata._id;

                return (
                  <div
                    key={index}
                    className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-xs text-white 
                      ${isMyMessage ? "bg-blue-500" : "bg-gray-500"}`}
                    >
                      {message.text}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Message Input */}
          <div className="h-16 border-t border-gray-200 bg-white flex items-center px-4 gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              onChange={(e) => settext(e.target.value)}
              value={text}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-gray-900"
            />

            <button
              onClick={handlemessagesend}
              className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              Select a chat
            </h2>

            <p className="text-gray-700 text-2xl ">
              Choose a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;