import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and Password is required");
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("Account already exists with this email");
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ email,id:user._id}, process.env.JWT_KEY, {
      expiresIn: 3 * 24 * 60 * 60 * 1000,
    });
    res.cookie("jwttoken", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
      message: "Signup Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email & Password is Required");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User with given email is not found.");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).send("Password is incorrect.");
    }
    const token = jwt.sign({ email,id:user._id }, process.env.JWT_KEY, {
      expiresIn: 3 * 24 * 60 * 60 * 1000,
    });
    res.cookie("jwttoken", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
      message: "Login Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res, next) => {
  try { 
     const user=await User.findById(req.userId);
     if(!user){
        return res.status(404).send("User with give Id not Found")
     }
    return res.status(200).json({
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
  });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};


export const updateUserInfo = async (req, res, next) => {
    const {firstName,lastName}=req.body;
    if(!firstName || !lastName){
      return res.status(400).send("FirstName and LastName is required")
    }
  try { 
     const user=await User.findByIdAndUpdate(req.userId,{
      firstName,
      lastName,
      profileSetup:true
     },{new:true,runValidators:true});
     if(!user){
        return res.status(404).send("User with give Id not Found")
     }
    return res.status(200).json({
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
  });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
