import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: null,

  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setUSer: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLogOut: (state) => {
      state.user = null;
       state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setUSer, setError, setLogOut } = AuthSlice.actions;
export default AuthSlice.reducer;
