const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB connect successfully.")
    } catch (error) {
        console.log("Error :",error.message)
        process.exit()
    }
}

module.exports = connectDB