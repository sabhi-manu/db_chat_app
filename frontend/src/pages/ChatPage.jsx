import React, { useEffect, useState } from 'react';

import MyChat from '../components/MyChat/MyChat'
import ChatBox from '../components/Chat box/ChatBox'
import NavBar from '../components/navBar/NavBar'
import Profile from '../components/ModelPopup/Profile'
import GroupChatModal from '../components/ModelPopup/GroupChatModal';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedChat } from '../features/Slice/chatSlice';
import socket from '../components/socket/socket';

const ChatPage = () => {
   const dispatch = useDispatch()

  let {selectedChat,loading} = useSelector((state)=>state.chat)

    //set up the connection with socket

    let {user} = useSelector((state)=>state.auth)
 
useEffect(()=>{
   if (!user) return;

  socket.on("connected", () => {
      console.log("Socket connected successfully!");
    });
},[user])

// set up the room 

useEffect(()=>{
if(selectedChat){  
  console.log("selected user for create ",selectedChat)
   socket.emit("join room", selectedChat._id);
}
},[selectedChat])

  return (
    <div className="w-full h-screen flex flex-col">

      <NavBar  />
      <Profile />
      <GroupChatModal/>
      <div className="flex grow overflow-hidden">

        {/* LEFT PANEL */}
        <div
          className={`
            border-r border-gray-300 overflow-y-auto
            ${selectedChat ? "hidden" : "block"}   
            md:block                             
            w-full md:w-[30%] md:min-w-[300px]
          `}
        >
          <MyChat  />
        </div>

        {/* RIGHT PANEL */}
        <div
          className={`
            overflow-y-auto grow
            ${selectedChat ? "block" : "hidden"}  
            md:block                            
          `}
        >
          <ChatBox chat={selectedChat} onBack={() => dispatch(setSelectedChat(null))} />
        </div>

      </div>
    </div>
  );
};

export default ChatPage;
