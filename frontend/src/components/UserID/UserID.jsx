import React from "react";


 const UserID = ({ user, openUserHandler }) => {
  // console.log('user for check group==>',user)
  return (
    <div
     onClick={openUserHandler}
      className="flex items-center mt-1 gap-2 p-2 border rounded cursor-pointer bg-gray-400 hover:bg-gray-500"
    >
      <img
        src={user?.avatar}
        alt="profile image"
        className="w-10 h-10 rounded-full"
      />

      <div className="leading-3.5">
        <p className="text-sm">{user?.name}</p>
        {user?.email ? <p className="text-xs "> <strong>Email:</strong> {user?.email}</p> : <p className="text-xs ">Group</p>}
        
      </div>
    </div>
  );
};



export default UserID;
