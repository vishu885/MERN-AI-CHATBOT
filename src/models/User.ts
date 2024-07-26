import mongoose, { Schema } from "mongoose";
import { chatSchema } from "./Chat.js";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    chat : [chatSchema]


})
export default mongoose.model("User",userSchema); 