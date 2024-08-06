import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/tokenManager.js";



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
        const userExists=await User.findOne({email});
        if(userExists) return res.status(401).send("User with same email already exists!")
        const hashedPwd=await hash(password,10);  //encrypt pwd using bcrypt encoder dependency
        const user=new User({name,email,password:hashedPwd});
        await user.save();
        //after user signup set token in cookie and set cookie is response
        setTokenInCookie(req,res,next,user);


        return res.status(201).json({message:"OK", id:user.id.toString()})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:"ERROR", cause:error});

    }
    
}

//method for user Login
export const userLogin=async(req:Request, res: Response,next:NextFunction)=>{
    try{
        console.log("Inside user Login");
        const {email, password}=req.body;
        const user=await User.findOne({email});
        console.log(user);
        if(!user){
            res.status(401).send("user is not registered!");
        }
        const isPasswordValid=await compare(password,user.password);
        if(!isPasswordValid){
            return res.status(403).send("Bad credentials: Invalid password"); //403:Forbidden
        }
        
        //if user logins again we want to remove previous cookie and set current cookie
        //it will remove cookie of the response of the user
        // res.clearCookie("COOKIE_NAME",{
        //     httpOnly:true,
        //     domain:"localhost",
        //     signed:true,
        //     path:"/"
        // });


        // //if email and pwd is valid ,after user authentication create token
        // const token=createToken(user._id.toString(),user.email,"7d");

        // const expires=new Date();  // for cookie
        // expires.setDate(expires.getDate()+7);
        // //to send cookie from backend to frontend and set jwt token inside cookie
        // res.cookie("COOKIE_NAME",token,{
        //     path:"/"  , //path defines inside root directory of cookies we want to store cookie
        //     domain:"localhost" ,//cos frontend will also be in localhost
        //     expires,   //expiration of cookie same as token
        //     httpOnly:true,
        //     signed:true //cookie is signed , this wld reencrypt the cookie in sign format
        // })

        //after user login set token in cookie and set cookie is response
        setTokenInCookie(req,res,next,user);

        return res.status(200).json({message:"Ok",id:user._id.toString()}); 
        
         
    }
    catch(errors){
        console.log(errors);
        throw new Error("Error during User Login");

    }
}
const setTokenInCookie=(req:Request, res:Response, next:NextFunction,user)=>{
    //if user logins again we want to remove previous cookie and set current cookie
        //it will remove cookie of the response of the user
        res.clearCookie("COOKIE_NAME",{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/"
        });


        //if email and pwd is valid ,after user authentication create token
        const token=createToken(user._id.toString(),user.email,"7d");

        const expires=new Date();  // for cookie
        expires.setDate(expires.getDate()+7);  //cookie can be stored for 7 days and after that user has to re login
        
        //to send cookie from backend to frontend and set jwt token inside cookie
        res.cookie("COOKIE_NAME",token,{
            path:"/"  , //path defines inside root directory of cookies we want to store cookie
            domain:"localhost" ,//cos frontend will also be in localhost
            expires,   //expiration of cookie same as token
            httpOnly:true,
            signed:true //cookie is signed , this wld reencrypt the cookie in sign format
        })

}