import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "../features/Slice/AuthSlice"
import ChatReducer from "../features/Slice/chatSlice"
import UserReducer from "../features/Slice/userSlice"
import MessageReducer from "../features/Slice/messageSlice"

 const store = configureStore({
  reducer: {
    auth:AuthReducer,
    chat:ChatReducer,
    user:UserReducer,
    message:MessageReducer
  },
})




export default store