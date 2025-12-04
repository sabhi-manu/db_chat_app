const express = require("express")
const { messageCreateController, deleteMessageController, accessChatMessageController } = require("../controllers/message.controller")

const authMiddleware = require("../../middlewares/auth.middleware")
const route = express.Router()

route.post("/send",authMiddleware,messageCreateController)
route.delete("/remove",authMiddleware,deleteMessageController)
route.get("/:chatId",authMiddleware,accessChatMessageController)


module.exports = route