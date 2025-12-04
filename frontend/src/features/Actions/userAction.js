
import axiosInstance from "../../api/axiosInstance"
import { setError, setLoading, setUsers } from "../Slice/userSlice"


export const allUserAction = ()=>async(dispatch)=>{
    try {
        console.log("this is all user action ==>")
        dispatch(setLoading(true))
        let response = await axiosInstance.get("/auth/user/all")
        console.log('all user response ==>',response)
        if(response.status == 200){
            dispatch(setUsers(response.data.users))
        }

    } catch (error) {
        console.log('error in fetching all user ==>',error.message)
  dispatch(setError(error.message))
    }
}