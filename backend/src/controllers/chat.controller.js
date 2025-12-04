const chatMOdel = require("../models/chatModel");
const userModel = require("../models/userModel");
const { nanoid } = require("nanoid");
const fileUpload = require("../services/imageKit.service");



const accessChatController = async (req, res) => {
  console.log("user id ==>",req.body)
  try {
    let { userId } = req.body;
    console.log("user id ==>",userId)
    if (!userId) {
      return res.status(400).json({
        message: "provide user id to whom you chat!",
      
      });
    }
    let isChat = await chatMOdel
      .find({
        isGroup: false,
        $and: [
          { members: { $elemMatch: { $eq: req.user._id } } },
          { members: { $elemMatch: { $eq: userId } } },
        ],
      })
      .populate("members")
      .populate("latestMessage");

    isChat = await userModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email",
    });


console.log(`is chat for check the length ==>`,isChat)



    if (isChat.length > 0) {
      return res.status(200).json(isChat[0]);
    }
    let createChat = await chatMOdel.create({
      members: [req.user._id, userId],
      isGroup: false,
      chatId: [req.user._id, userId].sort().join("_"),
    });


    const fullChat = await chatMOdel
      .findById(createChat._id)
      .populate("members", "-password");

    return res.status(201).json(fullChat);

  } catch (error) {
    console.log("Error in accessChatController:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchCahtsController = async (req, res) => {
  try {
  
    let userId = req.user._id
   
       let allchat = await chatMOdel.find({
      members: { $in: [userId] }
    }).populate("members", "-password").populate("latestMessage")

    allchat = await userModel.populate(allchat, {
      path: "latestMessage.sender",
      select: "name email avatar",
    });
    return res.status(200).json(allchat)

  } catch (error) {
    console.log("Error in fetch Chat Controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// group chat 

const createGroupChatController = async (req, res) => {
  try {
    let { name, users } = req.body
    console.log(name,users)
    console.log(typeof users)
    
     if (typeof users === "string") {
      users = JSON.parse(users);
    }
    if (!name) {
      return res.status(400).json({ message: "group name require." })
    }

    if (!users || users.length < 2) {
      return res.status(400).json({
        message: "Group must have at least 2 users apart from you."
      });
    }
    users.push(req.user._id)

    const existingGroup = await chatMOdel.findOne({
      isGroup: true,
      groupName: name
    });

    if (existingGroup) {
      return res.status(400).json({ message: "Group name already exists." });
    }

      let avatarUrl = null;

    if (req.file) {
      const uploadResponse = await fileUpload({
        file: req.file.buffer,
        fileName: req.file.originalname
      })
      console.log("file response ==>", uploadResponse);
      avatarUrl = uploadResponse.url;
    }



    let newGrp = await chatMOdel.create({
       chatId: "group_" + nanoid(),
      members: users,
      isGroup: true,
      groupName: name,
      groupAdmin: req.user._id,
      groupImage:avatarUrl
    })
    let group = await chatMOdel.findById(newGrp._id).populate("members", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(group)
  } catch (error) {
    console.log("error in create group ==>", error.message)
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}


const renameGroupController =async (req,res)=>{
  try {
    let {newName,groupId} = req.body
    console.log(`group name : ${newName} and group name ${groupId}`)
    if(!newName || !groupId){
      return res.status(400).json({message:"provide all details."})
    }
    let group = await chatMOdel.findById(groupId).populate("groupAdmin")
    if(!group){
      return res.status(400).json({
        message:"group not exist"
      })
    }
let isAdmin = group.groupAdmin._id.toString() === req.user._id.toString();
    if(!isAdmin){
      return res.status(403).json({
        message:"only admin can change ."
      })
    }
    group.groupName = newName
   let updateGroup = await group.save()
   return res.status(200).json({
    message:"gorup name update successfully.",
     data: updateGroup,
   })
  } catch (error) {
     console.log("error in reName group ==>", error.message)
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}


const addUserToGroupController = async(req,res)=>{
  try {
    
    let {userId,groupId} = req.body

    if (!userId || !groupId){
      return res.status(400).json({message:"provide all details"})
    }

    let group = await chatMOdel.findById(groupId)
    if (!group) return res.status(404).json({ message: "Group not found" });

    if(group.groupAdmin.toString() !== req.user._id.toString()){
      return res.status(403).json({
        message:"only admin add the user."
      })
    }
   
    if(group.members.some((val)=>val.toString() == userId.toString())){
       return res.status(400).json({ message: "User already in group" });
    }

    group.members.push(userId)
    await group.save();

    let updateGroup = await chatMOdel.findById(groupId).populate("members","-password").populate("groupAdmin","-password")

       return res.status(200).json({
      message: "User added to group successfully",
      data: updateGroup,
    });
    
  } catch (error) {
    console.log("error in add uer controller =>",error.message)
    return res.status(500).json({
      message:"server error",
      error:error.message
    })
  }
}

const removeUserfromGroupController = async(req,res)=>{
  try {
    let {userId,groupId}= req.body;
  if (!userId || !groupId) {
      return res.status(400).json({ message: "Provide all details." });
    }

    let group = await chatMOdel.findById(groupId)
        if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }
        if (group.groupAdmin.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Only admin can remove users" });
}

    if( !group.members.some(
  m => m.toString() === userId.toString())){
      return res.status(400).json({message:"user not exist in group."})
    }


   const updatedGroup =  await chatMOdel.findByIdAndUpdate(groupId,
     { $pull:{members: userId}},
      { new: true }
    ).populate("members", "-password")
      .populate("groupAdmin", "-password")


     return  res.status(200).json({
      message: "User removed from group successfully",
      data: updatedGroup,
    });

  } catch (error) {
    console.log("error in remove user from group  ==>",error.message)
    return res.status(500).json({
      message:"server error ",
      error:error.message
    })
  }
}


module.exports = { accessChatController, fetchCahtsController,createGroupChatController ,renameGroupController,addUserToGroupController,removeUserfromGroupController};
