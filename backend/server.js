import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import mongoDBConn from "./db/mongoDbConn.js";
import {app , server} from "./socket/socket.js"

//const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);





server.listen(PORT, ()=>{
    mongoDBConn();
    console.log(`Server running on port ${PORT}`)
});