import mongoose from "mongoose";

const ChatSchema = mongoose.Schema(
    {
    chatName: {type:String, trim:true},
    isGroupChat: {type:Boolean, default:false},
    users: [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    latestMessage:{type:mongoose.Schema.Types.ObjectId, ref:"Message"},
    groupAdmin: {type:mongoose.Schema.Types.ObjectId, ref:"Users"}
    },
    {timestamps:true}
)

const Chat = mongoose.model("Chat", ChatSchema)
module.exports = Chat

// chatName
// isGroupChat
// users
// latesMessage
// groupAdmin