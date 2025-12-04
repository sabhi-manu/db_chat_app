require('dotenv').config()
const http = require("http")
const app = require("./src/app")
const connectDB = require('./src/config/db')
const {Server}  = require("socket.io")
const socketLogic = require('./src/config/socket')


const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

connectDB()

socketLogic(io)


server.listen(3000,()=>{
    console.log(`server is runing on port http://localhost:3000`)
})