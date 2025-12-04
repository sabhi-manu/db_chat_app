import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     chats: [],
  selectedChat: null,
  loading: false,
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading = true
        },
        setSelectedChat:(state,action)=>{
            state.selectedChat = action.payload
            state.loading = false
        },
        setChat:(state,action)=>{
            state.chats = action.payload,
            state.loading = false
        },
        addChat : (state,action)=>{
            let existChat = state.chats.find((val)=>val._id== action.payload._id)
            if(!existChat){
                state.chats.unshift(action.payload)
            }
        }
    }
})

export const {setLoading,setSelectedChat,setChat,addChat} = chatSlice.actions
export default chatSlice.reducer

