
const chatMOdel = require("../models/chatModel");
const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");

const messageCreateController = async (req, res) => {
  console.log("message create data ==>",req.body)
  try {
    let { message, chatId } = req.body;
    if (!message || !chatId) {
      return res.status(400).json({
        message: "provide all details.",
      });
    }
    let newMessage = await messageModel.create({
      message,
      chat: chatId,
      sender: req.user._id,
    });

    newMessage = await newMessage.populate("sender", "name email");
    newMessage = await newMessage.populate("chat");

    newMessage = await userModel.populate(newMessage, {
      path: "chat.members",
      select: "name email",
    });

    await chatMOdel.findByIdAndUpdate(chatId, {
      latestMessage: newMessage._id,
    });
    return res.status(201).json({message:newMessage});
  } catch (error) {
    console.log("error in create message.",error.message);
    return res.status(500).json({
      message: "internal server error.",
      error: error.message,
    });
  }
};

const deleteMessageController = async (req,res)=>{
  try {
    let {messageId} = req.body
    if(!messageId){
      return res.status(400).json({message:"Message id requried."})
    }
    const message = await messageModel.findById(messageId)
     if(message){
      return res.status(400).json({message:"Message not found."})
    }
    if(message.sender.toString()!== req.user._id.toString()){
      return res.status(403).json({
        message:"not allow to delete."
      })
    }
    await messageModel.findByIdAndDelete(messageId)
     return res.status(200).json({message:"messasge deleted successfully."});
  } catch (error) {
     console.log("error in delete message.");
    return res.status(500).json({
      message: "internal server error.",
      error: error.message,
    });
  }
}

const accessChatMessageController = async(req,res)=>{
  try {
    let {chatId} = req.params
    console.log("chat id ==>",chatId)
     if (!chatId) {
      return res.status(400).json({
        message: "Chat ID is required.",
      });
    }
       const messages = await messageModel
      .find({ chat: chatId })
      .populate("sender", "name email avatar") 
      .populate("chat");

    return res.status(200).json({
      message: "Messages fetched successfully.",
      messages,
    });
  } catch (error) {
      console.log("error in access chat message.",error.message);
    return res.status(500).json({
      message: "internal server error.",
      error: error.message,
    });
  }
}

module.exports = {messageCreateController,deleteMessageController,accessChatMessageController}

