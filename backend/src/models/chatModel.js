const mongoose = require("mongoose")
const chatSchema = new mongoose.Schema({
    chatId :{
        type:String,
        required:true,
        unique:true

    },
    members : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    isGroup:{
        type:Boolean,
        default:false
    },
     groupName: {
    type: String,
    default: "",
  },

  groupImage: {
    type: String,
    default: "",
  },
  latestMessage:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message"
  },
  groupAdmin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
},{timestamps:true})

const chatMOdel = mongoose.model("Chat",chatSchema)
module.exports = chatMOdel