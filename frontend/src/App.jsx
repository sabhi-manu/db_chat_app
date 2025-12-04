import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import RegisterForm from "./components/Authentication/RegisterForm";
import LoginForm from "./components/Authentication/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { currentUserAction } from "./features/Actions/AuthAction";

const App = () => {
  let dispatch = useDispatch()
  let {user} = useSelector((state)=>state.auth)
console.log("current user ==>",user)
  useEffect(()=>{
    dispatch(currentUserAction())
  },[])
  return (
    <div className="homepage">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
