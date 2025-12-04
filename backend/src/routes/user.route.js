const express = require("express")
const { registerUserController, loginUserController, logoutUserController, searchUserController, allUSersController, currentUser } = require("../controllers/user.controller")
const multer = require("multer")
const authMiddleware = require("../../middlewares/auth.middleware")
const route = express.Router()

const upload = multer({storage:multer.memoryStorage()})

route.post("/register", upload.single("avatar") , registerUserController)
route.post("/login",loginUserController)
route.post("/logout",authMiddleware,logoutUserController)
route.get("",authMiddleware,searchUserController)
route.get("/all",allUSersController)
route.get("/profile",authMiddleware,currentUser)

module.exports = route


