const jwt = require("jsonwebtoken");
const userModel = require("../src/models/userModel");

const authMiddleware = async (req,res,next)=>{
    try {
        let {token} = req.cookies;
        console.log("token",token)
        if(!token){
            return res.status(400).json({
                message:"token is not provided.",
                error:error.message
            })
        }

        let {id} =  jwt.verify(token,process.env.JWT_TOKEN)
            const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
req.user = user;
next()
    } catch (error) {
        console.log("error in auth middle ware ==>",error.message)
        return res.status(500).json({
           messaege: error.message
        })
    }

}

module.exports = authMiddleware