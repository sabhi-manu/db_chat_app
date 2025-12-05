import { io } from "socket.io-client";

const socket = io("https://chat-backend-qfh7.onrender.com",{withCredentials: true,})

export default socket


