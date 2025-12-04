import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket/socket";
import { addMessageAction, fetchAllMessageAction } from "../../features/Actions/messageAction";
import { useEffect } from "react";
import { addMessage } from "../../features/Slice/messageSlice";

const ChatBox = ({ chat, onBack }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);

  const {messages} = useSelector((state)=>state.message)
console.log(messages)
  // update with new message
  useEffect(() => {
  const handleMessage = (msg) => {
    dispatch(addMessage(msg))
    // console.log(msg)
  };

  socket.on("message-received", handleMessage);

  return () => {
    socket.off("message-received", handleMessage);
  };
}, []);

// fetch all message
useEffect(()=>{
  dispatch(fetchAllMessageAction(chat?._id))
},[chat?._id])

  // console.log("current user chat box  ==>", chat);
  if (!chat) {
    return (
      <div className="w-[70%] flex justify-center items-center">
        <p>Select a chat</p>
      </div>
    );
  }

  let chatName, chatAvatar;

  // for one to one chat
  if (!chat.isGroup) {
    const otherUser = chat.members.find((m) => m._id !== user._id);
    // console.log("other user for profile photo==>",otherUser)
    chatName = otherUser?.name;
    chatAvatar = otherUser?.avatar;
  } else {
    // for group chat
    chatName = chat?.groupName;
    chatAvatar = chat?.groupImage;
  }

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    console.log("current message to send ==>", message);
    let data = {
      message,
      chatId: chat._id,
    };

    let response = await dispatch(addMessageAction(data));
    console.log(
      "message response form action add message",
      response?.data.message
    );

    socket.emit("message", response?.data.message);
    setMessage("");
  };

  return (
    <div className="w-full h-full border p-3 flex flex-col justify-between">
      <div className="flex items-center gap-3 border p-3">
        <button className="md:hidden mb-2" onClick={onBack}>
          Back
        </button>
        <div className="flex items-center gap-3">
          <div>
            <img
              src={chatAvatar}
              alt="profile image"
              className="w-15 h-15 rounded-full"
            />
          </div>
          <h2 className="font-bold">{chatName}</h2>
        </div>
      </div>

      {/* chat messages here */}
       <div className="flex-1 overflow-y-auto p-4  border-amber-50 bg-red-300">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 my-1 rounded-lg max-w-[70%] ${
              msg.sender._id === user._id
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black mr-auto"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* sending message here */}
      <div className="w-full border-t p-2 rounded-2xl  bg-white">
        <form onSubmit={sendMessageHandler} className="flex items-center gap-2">
          <input
            type="text"
            name="message"
            id="message"
            className="flex-1 border p-2 rounded outline-none"
            placeholder="Type Message ...."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            send <i className="fa-solid fa-caret-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
