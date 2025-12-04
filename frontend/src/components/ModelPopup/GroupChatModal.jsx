import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createGroupAction } from "../../features/Actions/chatAciton";

// const sampleChats = [
//   {
//     _id: "chat1",
//     user: {
//       _id: "u1",
//       name: "Aarav Sharma",
//       email: "aarav@example.com",
//       avatar:
//         "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60",
//     },
//     lastMessage: "Hey! How are you?",
//   },
//   {
//     _id: "chat2",
//     user: {
//       _id: "u2",
//       name: "Priya Verma",
//       email: "priya@example.com",
//       avatar:
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
//     },
//     lastMessage: "Did you finish your work?",
//   },
//   {
//     _id: "chat3",
//     user: {
//       _id: "u3",
//       name: "Rohan Patel",
//       email: "rohan@example.com",
//       avatar:
//         "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=500&auto=format&fit=crop&q=60",
//     },
//     lastMessage: "Let's meet tomorrow!",
//   },
//   {
//     _id: "chat4",
//     user: {
//       _id: "u4",
//       name: "Neha Gupta",
//       email: "neha@example.com",
//       avatar:
//         "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60",
//     },
//     lastMessage: "Okay I will send the file.",
//   },
//   {
//     _id: "chat5",
//     user: {
//       _id: "u5",
//       name: "Vikram Singh",
//       email: "vikram@example.com",
//       avatar:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60",
//     },
//     lastMessage: "Call me when you're free.",
//   },
// ];

const GroupChatModal = () => {
  let dispatch = useDispatch()
  let [grpName, setGrpName] = useState("");
  let [groupImage,setGroupImage] = useState(null)
  let [selecteUser, setSelecteUser] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");
 
  let [showUserList, setShowUserList] = useState(false);
  let {users} = useSelector((state)=>state.user)

  
  const createGroupHandler = (e) => {
  e.preventDefault();
  
     if (!grpName.trim()) {
      return alert("Group name is required");
    }
     if (selecteUser.length < 2) {
      return alert("Add at least 2 members");
    }
    if (!groupImage) {
      return alert("Group image is required");
    }

  let formData = new FormData()
  formData.append("name",grpName)

  formData.append("groupImage", groupImage);
  const userIds = selecteUser.map(u => u._id);

formData.append("users", JSON.stringify(userIds));

dispatch(createGroupAction(formData))
  };

 

  const filteredUsers = users?.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selecteUserHandler = (chat) => {
    let existUser = selecteUser.some((val) => val._id === chat._id);
    if (existUser) {
      return alert("user selected.");
    }
    setSelecteUser((pre) => [...pre, chat]);
    setShowUserList(false);
    setSearchQuery(""); 
  };
  return (
    <div
      className="modal fade"
      id="groupModel"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Create Group Chat
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <form
                onSubmit={(e) => createGroupHandler(e)}
                className="flex flex-col gap-3"
              >
                <input
                  type="text"
                  name="groupName"
                  id="groupName"
                  placeholder="Enter grp Name..."
                  className="border px-2 py-1"
                  value={grpName}
                  onChange={(e) => setGrpName(e.target.value)}
                />

               <input
                   type="file"
                   className="border px-2 py-1"
                    accept="image/*"
                   
                       onChange={(e) => setGroupImage(e.target.files[0])}
                    />


                <input
                  type="search"
                  name="userSearch"
                  id="userSearch"
                  placeholder="Add Users "
                  className="border px-2 py-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowUserList(true)}
                />

                {showUserList && (
                  <div className="border p-2 mt-1 rounded bg-white max-h-52 overflow-y-auto shadow">
                    {filteredUsers.length === 0 ? (
                      <p className="text-gray-500 text-sm">No users found</p>
                    ) : (
                      filteredUsers.map((chat) => (
                        <div
                          key={chat._id}
                          className="flex items-center gap-3 p-1 hover:bg-gray-100 cursor-pointer rounded"
                          onClick={() => selecteUserHandler(chat)}
                        >
                          <img
                            src={chat.avatar}
                            alt={chat.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{chat.name}</p>
                            <p className="text-xs text-gray-500">
                              {chat.email}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {selecteUser &&
                  selecteUser.map((chat) => (
                    <div key={chat._id} className="flex gap-2 items-center">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="font-medium">{chat.name}</p>
                    </div>
                  ))}

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;
