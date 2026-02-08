require('dotenv').config()
const http = require("http")
const app = require("./src/app")
const connectDB = require('./src/config/db')
const {Server}  = require("socket.io")
const socketLogic = require('./src/config/socket')
const cors = require("cors")


const server = http.createServer(app)
const io = new Server(server, {
  cors: {
   origin: process.env.FRONTEND_URL, 
    methods: ["GET", "POST"],
    credentials: true
  }
});

connectDB()

socketLogic(io)

const PORT = process.env.PORT ;
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})