import axiosInstance from "../../api/axiosInstance"
import { addMessage, setError, setLoading, setMessage } from "../Slice/messageSlice"



export const fetchAllMessageAction = (chatId)=>async(dispatch)=>{
    try {
        dispatch(setLoading())
        console.log("chat id fro fetch chat==>",chatId)
        let response = await axiosInstance.get(`/message/${chatId}`)
        console.log("fetch all message response ==>",response)
        if(response.status == 200){
            dispatch(setMessage(response.data.messages))
        }
    } catch (error) {
        console.log("error in fetch all message",error.message)
        dispatch(setError(error.message))
    }
}


export const addMessageAction = (data)=>async(dispatch)=>{
    console.log("action new message ==>",data)
    try {
         dispatch(setLoading())
        let response = await axiosInstance.post("/message/send",data)
        console.log(response)
        if(response.status == 201){
            // dispatch(addMessage(response.data.message))
            return response
        }
    } catch (error) {
           console.log("error in add  message",error.message)
        dispatch(setError(error.message))
    }
}









