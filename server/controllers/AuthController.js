import User from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const signup=async(req,res,next)=>{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password is required");
        }
        try {
        let user=await User.findOne({email})
        if(user){
            return res.status(400).send("Account already exists with this email")
        }
        const salt=await bcrypt.genSalt();
        const hashPassword=await bcrypt.hash(password,salt);

        user=await User.create({
            email,
            password:hashPassword
        })
        const token=jwt.sign({email},process.env.JWT_KEY,{expiresIn:3*24*60*60*1000});
        res.cookie("jwttoken",token,{
            maxAge:3*24*60*60*1000,
            secure:true,
            sameSite:"None"
        });

        return res.status(201).json({user:
            {
                id:user._id,
                email:user.email,
                profileSetup:user.profileSetup

            },
            message:"Signup Successfull"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error");
    }
}

export const login=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).send("Email & Password is Required");
    }
    try {
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).send("User with given email is not found.");
        }
        const auth=await bcrypt.compare(password,user.password);
        if(!auth){
            return res.status(400).send("Password is incorrect.")
        }
        const token=jwt.sign({email},process.env.JWT_KEY,{expiresIn:3*24*60*60*1000});
        res.cookie("jwttoken",token,{
            maxAge:3*24*60*60*1000,
            secure:true,
            sameSite:"None"
        })

        return res.status(200).json({user:{
            id:user.id,
            email:user.email,
            profileSetup:user.profileSetup,
            firstName:user.firstName,
            lastName:user.lastName, 
            image:user.image,
            color:user.color
        },message:"Login Successfull"})
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}