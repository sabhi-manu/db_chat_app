const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')

const userRoute = require("./routes/user.route")
const chatRoute = require("./routes/chat.route")
const messageRoute = require("./routes/message.route")

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));




app.use(cors({
 origin: ["http://localhost:5173", "https://talktogether-chat.netlify.app"],
  credentials: true
}));

app.get("/api/auth/test", (req, res) => {
  res.send("Backend connected!");
});


app.use("/api/auth/user",userRoute)
app.use("/api/chat",chatRoute)
app.use("/api/message",messageRoute)

module.exports = app


