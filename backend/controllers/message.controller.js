import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res)=>{
    try{
        const { message } = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id;

        const existingConversation = await Conversation.findOne({
            participants: { $all: [recieverId, senderId] },
        });

        let newMessage;

        if(!existingConversation){
            existingConversation = await Conversation.create({
				participants: [senderId, recieverId],
			});
            newMessage = new Message({
                senderId,
                recieverId: recieverId,
                message,
            });
        }else{
            newMessage = new Message({
                senderId,
                recieverId: recieverId,
                message,
            });
        }

        // const newMessage = new Message({
		// 	senderId,
        //     recieverId: recieverId,
        //     message,
		// });

        if(newMessage){
            existingConversation.messages.push(newMessage._id);
        }

        // await existingConversation.save();
        // await newMessage.save();

        await Promise.all([existingConversation.save(), newMessage.save()]);

        const reciverSocketId = getReceiverSocketId(recieverId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage", newMessage);
        }
        
        res.status(201).json(newMessage);
    }catch(error){
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessages = async (req,res)=>{
    try{
        const {id: recieverId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
			participants: { $all: [senderId, recieverId] },
		}).populate("messages"); //allows you to replace specified paths (usually references to other documents) in a document with the actual documents from other collections.

        if (!conversation) return res.status(200).json([]);
        const messages = conversation.messages;

        res.status(200).json(messages);
    }catch(error){
        console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}