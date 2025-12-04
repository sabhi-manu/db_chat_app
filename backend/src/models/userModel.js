const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default: "https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVtb2ppc3xlbnwwfHwwfHx8MA%3D%3D",
  },

  online: {
    type: Boolean,
    default: false,
  },

  lastSeen: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

module.exports = userModel
