import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash } from "bcrypt";



//get all users from database
export const getAllUsers=async(req:Request, res:Response,next: NextFunction)=>{
    
    try{

        const users=await User.find();
        return res.status(200).json({message:"OK", users})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:"ERROR", cause:error});

    }
    
}
//user signup
export const userSignUp=async(req:Request, res:Response,next: NextFunction)=>{
    
    try{
        console.log("INSIDE USER SIGN UP CONTROLLER");
        const {name, email, password}=req.body;
        const hashedPwd=await hash(password,10);  //encrypt pwd using bcrypt encoder dependency
        const user=new User({name,email,password:hashedPwd});
        await user.save();
        return res.status(200).json({message:"OK", id:user.id.toString()})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:"ERROR", cause:error});

    }
    
}