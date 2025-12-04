const express = require("express")
const { accessChatController, fetchCahtsController, createGroupChatController, renameGroupController, addUserToGroupController, removeUserfromGroupController } = require("../controllers/chat.controller")
const authMiddleware = require("../../middlewares/auth.middleware")

const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})


const route = express.Router()


route.post("/access",authMiddleware,accessChatController)
route.get("",authMiddleware,fetchCahtsController)
route.post("/group",authMiddleware,upload.single("groupImage"),createGroupChatController)
route.put("/group/rename",authMiddleware,renameGroupController)
route.post("/group/add",authMiddleware,addUserToGroupController)
route.delete("/group/remove",authMiddleware,removeUserfromGroupController)

module.exports = route






