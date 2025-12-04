import { createSlice } from "@reduxjs/toolkit";

const initialState ={
     messages: [],      
  loading: false,    
  error: null, 
}


const messageSlice = createSlice({
    name:"message",
    initialState,
    reducers:{
        setLoading:(state)=>{
            state.loading = true
        },
        setMessage:(state,action)=>{
            state.loading = false
            state.messages= action.payload,
            state.error = null
        },
        addMessage:(state,action)=>{
            console.log("add message slice ==>",action.payload)
            state.loading = false
            state.messages = [...state.messages,action.payload]
            state.error = null
        },
        setError:(state,action)=>{
            state.loading = false
            state.error= action.payload
        }

    }
})

export const {setLoading,setMessage,addMessage,setError} = messageSlice.actions
export default messageSlice.reducer