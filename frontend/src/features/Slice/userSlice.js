import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     users: [],
    loading: false,
    error: null,
}

 const userSlice=  createSlice({
    name:"user",
    initialState,
    reducers:{
 setLoading:(state)=>{
    state.loading = true
 },
 setUsers:(state,action)=>{
    state.users = action.payload,
    state.loading=false
 },
 setError:(state,action)=>{
      state.loading = false;
        state.error = action.payload || "Something went wrong";
 }
    }
})

export const {setLoading,setUsers,setError} = userSlice.actions
export default userSlice.reducer