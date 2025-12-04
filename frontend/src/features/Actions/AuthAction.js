import axiosInstance from "../../api/axiosInstance";
import { setError, setLoading, setLogOut, setUSer } from "../Slice/AuthSlice";

export const currentUserAction = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let response = await axiosInstance.get("/auth/user/profile");
    if (response) dispatch(setUSer(response.data.user));
    return response;
  } catch (error) {
    console.log("error in register user ==>", error.message);
    dispatch(setError(error.message));
  }
};

export const registerAction = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    let response = await axiosInstance.post("/auth/user/register", formData);
    console.log("response of register user ==>", response);
    if (response) {
      dispatch(setUSer(response.data.user));
    }
    return response;
  } catch (error) {
    console.log("error in register user ==>", error.message);
    dispatch(setError(error.message));
  }
};

export const loginUSerAction = (data)=>async (dispatch)=>{
    dispatch(setLoading(true));
  try {
    console.log("login user data==>",data)
    let response = await axiosInstance.post("/auth/user/login",data)
    if(response){
       dispatch(setUSer(response.data.user));
    }
    return response
  } catch (error) {
     console.log("error in login user ==>", error.message);
    dispatch(setError(error.message));
  }
}

export const logoutUserAction = (data)=>async(dispatch)=>{
    dispatch(setLoading(true));
  try {
    let response = await axiosInstance.post("/auth/user/logout")
    if(response){
      dispatch(setLogOut())
    }
    return response
  } catch (error) {
        console.log("error in logout user ==>", error.message);
    dispatch(setError(error.message));
  }
}


