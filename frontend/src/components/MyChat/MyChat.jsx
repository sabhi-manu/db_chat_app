import React, { useEffect, useState } from "react";
import UserID from "../UserID/UserID";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserChatsAction } from "../../features/Actions/chatAciton";
import { setSelectedChat } from "../../features/Slice/chatSlice";



const MyChat = () => {
  const dispatch =  useDispatch()
  
  let {user} = useSelector((state)=>state.auth)
  console.log(user)

  const {chats} = useSelector((state)=>state.chat)
  console.log("chats of current user ==>",chats)


  const getOtherUser = (chat, currentUserId) => {
    // console.log(chat,currentUserId)
  return chat.members.find(u => u._id !== currentUserId);
};

  useEffect(() => {
 
    dispatch(fetchUserChatsAction())
  }, []);

  return (
    <div className=" border p-3">
    <div className="flex justify-around items-center border p-2">
  <p className="font-bold text-2xl m-0">Chats</p>         
  <p className="border px-2 py-1 rounded m-0 bg-amber-100 cursor-pointer hover:bg-amber-200"   data-bs-toggle="modal" data-bs-target="#groupModel">
    New Group Chat <i className="fa-solid fa-plus"></i>
  </p>                                                 
</div>

      {chats?.map((chat) => {
  const isGroup = chat.isGroup;
  console.log(isGroup)
  const otherUser = getOtherUser(chat, user?._id);
// console.log('other user ==>',otherUser)
  return (
    <UserID
      key={chat._id}
      
      user={
        isGroup
          ? {
              name: chat.groupName,
              avatar:chat.groupImage
            }
          : otherUser
      }
     openUserHandler={() => dispatch(setSelectedChat(chat))}
    />
  );
})}
    </div>
  );
};

export default MyChat;
