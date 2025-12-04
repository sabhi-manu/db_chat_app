import axiosInstance from "../../api/axiosInstance"
import { addChat, setChat, setLoading, setSelectedChat } from "../Slice/chatSlice"



// get all the users we have in data base
export const fetchUserChatsAction = (data)=>async(dispatch)=>{
    try {
        dispatch(setLoading(true))
        console.log('all chat of user ==>',data)
        let response = await axiosInstance.get("/chat")
        console.log("user chat ==>",response)
        if(response.status== 200 ){
            dispatch(setChat(response.data))
        }
        
    } catch (error) {
        console.log("error in fetch current user chat ==>",error.message)

    }
}


// get the login user chat 
export const accessChatAction = (userId)=>async(dispatch)=>{
    try {
        console.log("this is user id from with chat ==>",userId)
        let response = await axiosInstance.post("/chat/access",{userId})
        console.log("this is response of chat access action===>",response)
        if(response.status == 200 || response.status == 201){
            dispatch(addChat(response.data))
            dispatch(setSelectedChat(response.data))
        }
    } catch (error) {
        console.log("error in access chat action ==>",error.message)

    }
}


// create group 
export const createGroupAction = (data)=>async(dispatch)=>{
    try {
        let response = await axiosInstance.post("/chat/group",data)
        console.log('response of create group ',response)
  if(response.status == 200 || response.status == 201){
            dispatch(addChat(response.data))
           
        }
    } catch (error) {
        console.log('error in create group chat ',error.message)
    }
}