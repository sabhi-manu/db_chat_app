import React, { useEffect, useState } from "react";
import UserID from "../UserID/UserID";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserAction } from "../../features/Actions/AuthAction";
import { allUserAction } from "../../features/Actions/userAction";
import { accessChatAction } from "../../features/Actions/chatAciton";

const sampleChats = [
  {
    _id: "chat1",
    user: {
      _id: "u1",
      name: "Aarav Sharma",
      email: "aarav@example.com",
      avatar:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60",
    },
    lastMessage: "Hey! How are you?",
  },
  {
    _id: "chat2",
    user: {
      _id: "u2",
      name: "Priya Verma",
      email: "priya@example.com",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
    },
    lastMessage: "Did you finish your work?",
  },
  {
    _id: "chat3",
    user: {
      _id: "u3",
      name: "Rohan Patel",
      email: "rohan@example.com",
      avatar:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=500&auto=format&fit=crop&q=60",
    },
    lastMessage: "Let's meet tomorrow!",
  },
  {
    _id: "chat4",
    user: {
      _id: "u4",
      name: "Neha Gupta",
      email: "neha@example.com",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60",
    },
    lastMessage: "Okay I will send the file.",
  },
  {
    _id: "chat5",
    user: {
      _id: "u5",
      name: "Vikram Singh",
      email: "vikram@example.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60",
    },
    lastMessage: "Call me when you're free.",
  },
];

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  
  let {users} = useSelector((state)=>state.user)
  console.log('all user ==>',users)

  let {user} = useSelector((state)=>state.auth)
  console.log("user for set the profile image ==>",user)

  const logoutUser = async () => {
    console.log("Logout clicked");
    try {
      let response = await dispatch(logoutUserAction());
      if (response.status == 200 || response.status == 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error in logout .");
    }
  };

  const searchHandler = () => {
    if (search.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      console.log("Searching user:", search);
    }
  };

  const filterUsers = users?.filter((val)=>val.name.toLowerCase().includes(search.toLocaleLowerCase()))
  console.log("filter user ==>",filterUsers)
 
  useEffect(()=>{
    dispatch(allUserAction())
  },[])

  return (
    <nav className="navbar navbar-light bg-light px-2">
      <div className="container-fluid">
        <div>
          <div className="d-flex items-center gap-2">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="search"
              className="hidden md:block border border-black p-2 rounded outline-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#sideMenu"
            />
            <i className="fa-solid fa-magnifying-glass md:text-2xl"></i>
          </div>
        </div>

        <div>
          <p className="navbar-brand text-2xl hidden md:block">Talk-A-Tive</p>
        </div>

        <div className="flex items-center gap-3">
          <i className="fa-solid fa-bell"></i>

          <div className="dropdown">
            <button
              className="btn border-0 p-0"
              type="button"
              id="userMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user?.avatar ? user.avatar :" https://images.unsplash.com/photo-1763244737839-220b4cd0259e?w=500&auto=format&fit=crop&q=60"}
                alt="User"
                className="rounded-circle"
                width="60"
                height="60"
              />
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="userMenuButton"
            >
              <li>
                <a
                  className="dropdown-item d-flex gap-0.5 align-items-center "
                  data-bs-toggle="modal"
                  data-bs-target="#profileModal"
                  href="#"
                >
                  <i className="fa-regular fa-user"></i>Profile
                </a>
              </li>

              <li>
                <button
                  className="dropdown-item d-flex gap-0.5 align-items-center"
                  onClick={logoutUser}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* side search bar */}
        <div className="offcanvas offcanvas-start" id="sideMenu">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Search Users</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="flex items-center justify-center gap-2 w-full border p-2">
            <input
              type="search"
              placeholder="search user..."
              className="border border-black p-2 rounded outline-none w-3/4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i
              className="fa-solid fa-magnifying-glass text-xl cursor-pointer"
              onClick={searchHandler}
            ></i>
          </div>

          <div className="offcanvas-body">
            {showAlert ? (
              <div> erter somethink </div>
            ) : (
              <>
                <p>This is your left side menu content.</p>
                {filterUsers?.map((chat) => (
                  <UserID
                    key={chat._id}
                    openUserHandler={() => dispatch(accessChatAction(chat._id))}
                    user={chat}
                  
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
