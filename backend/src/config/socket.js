const socketLogic = (io)=>{
    io.on("connection",(socket)=>{
        console.log("user connect successfully.",socket.id)


        socket.on("join room",(roomId)=>{
            socket.join(roomId)
            console.log("user join room  by room id ==>",roomId)
        })
        socket.on("message",(msg)=>{
            console.log("messag from frontend==>",msg)
          io.to(msg.chat._id).emit("message-received", msg);
         
        })
    })

    io.on("disconnect",()=>{
        console.log("user disconnect .",socket.id)
    })
}

module.exports = socketLogic