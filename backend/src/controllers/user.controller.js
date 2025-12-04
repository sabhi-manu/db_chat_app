const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fileUpload = require("../services/imageKit.service");


const registerUserController = async (req, res) => {
  try {

    let { name, email, password } = req.body;
console.log(`name ${name} and email :${email} and password :${password}`)

console.log("image ==>",req.file)

    let avatarUrl = null;

    if (req.file) {
      const uploadResponse = await fileUpload({
        file: req.file.buffer,
        fileName: req.file.originalname
      })
      console.log("file response ==>", uploadResponse);
      avatarUrl = uploadResponse.url;
    }


    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please Enter all the Fields" });
    }
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    let data = {
      name,
      email,
      password: hashPassword,
      online:true
    };
    if (req.file) {
      data.avatar = avatarUrl;
    }
    let newUser = await userModel.create(data);

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    console.log("new user register==>", newUser);

    newUser.password = undefined
    if (true) {
      res.status(200).json({
        message: "user register successfully.",
        user: newUser,
      });
    }
  } catch (error) {
    console.log("error in register controller ==>", error.message);
    return res.status(500).json({
      message: "internal server error.",
      error: error.message,
    });
  }
};

const loginUserController = async (req, res) => {
  try {console.log("this is login user data==>",req.body)
    let { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        message: "Provide all details."
      })
    }

    let user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({
        message: "user not found."
      })
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect details."
      });
    }
    user.online = true
    user.lastSeen = new Date();
    await user.save()
    let token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: "1d" })
    res.cookie("token", token)

    // user.password = undefined;
    console.log("login user ==>", user)
    return res.status(200).json({
      message: "User login successfully.",
      user

    });


  } catch (error) {
    console.log("error in login user ==>", error.message)
    return res.status(500).json({
      message: "internal server error.",
      error: error.message
    })
  }
}

const logoutUserController = async (req, res) => {
  try {
    let userId = req.user

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    user.online = false
    user.lastSeen = new Date();
    await user.save()

    user.password = undefined
    res.clearCookie("token")

    return res.status(200).json({
      message: "User logged out successfully.",
      user
    });

  } catch (error) {
    console.log("error in logout user controller ==>", error.message)
    return res.status(500).json({
      message: "internal server errror.",
      error: error.message
    })
  }
}


// api/auth/user?search=test
const searchUserController = async (req,res)=>{
  try {
    const { search } = req.query;

    let users = await userModel.find({
      $or:[
        {name:{ $regex: search , $options: "i" }},
        {email:{ $regex :search ,$options:"i"}}
      ]
    })
     res.status(200).json({ users })
  } catch (error) {
    console.log("error in search user controller ==>",error.message)
    return res.status(500).json({
      message:"internal server error",
      error:error.message
    })
  }
}

const allUSersController= async (req,res)=>{
  try {
    let allUser = await userModel.find({})
   
      return res.status(200).json({
        message:"users fetch successfully.",
        users:allUser
      })
    
  } catch (error) {
    console.log("eror in get all users contorller ==>",error.message)
    return res.status(500).json({
      message:"internal server error",
      error:error.message
    })
  }
}

const currentUser = async (req,res)=>{
  try {
    let user = req.user
    if(!user){
      return res.status(400).json({
        message:"token not present . Go for login."
      })
    }
    let userExist = await userModel.findById(user._id)
    if(!userExist){
      return res.status(400).json({
        message:"user not exist."
      })
    }
    console.log("user exist==> " , userExist)
    return res.status(200).json({
      meessage:"user fetch successfully.",
      user:userExist
    })
  } catch (error) {
    console.log("error in current user controller==>",error.message)
     return res.status(500).json({
      message:"internal server error",
      error:error.message
    })
  }
}

module.exports = { registerUserController, loginUserController, logoutUserController ,searchUserController,allUSersController,currentUser};
