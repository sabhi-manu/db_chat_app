const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  // chatId: {
  //   type: String,
  //   required: true,
  // },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  readBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ], // useful for read receipts ("seen")

  chat :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Chat"
  }

}, { timestamps: true });

const messageModel = mongoose.model("Message", messageSchema);
module.exports = messageModel
