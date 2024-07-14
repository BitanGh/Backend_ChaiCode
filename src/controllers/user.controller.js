import asyncHandler from "../utils/asynchandler.js";
import ApiError from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.service.js";
import ApiResponse from "../utils/apiresponse.js";

const registerUser = asyncHandler(async (req,res) =>{
  const {fullName,email,username,password} = req.body
 if ([fullName,email,username,password].some((fields) =>{
    fields?.trim() ===""
 })) {
    throw new ApiError(400,"All fields are required")
 }
 const existedUser = User.find(
    {$or: [{ email },{ username }]}
 )
 if (existedUser) {
   throw new ApiError(409,"User already exists")
 }
 const avatarLocalpath = req.files?.avatar[0]?.path
 const coverImageLocalpath = req.files?.coverImage[0]?.path
 if (!avatarLocalpath) {
   throw new ApiError(400,"Avatar is required");
 }
 const avatarUpload = await uploadOnCloudinary(avatarLocalpath)
 const coverImageUpload = await uploadOnCloudinary(coverImageLocalpath)
 if(!avatarUpload){
   throw new ApiError(400,"Avatar is required");
 }
 const userdb = User.create(
   {
      fullName,
      email,
      avatar: avatarUpload.url,
      coverImage: coverImageUpload?.url || " ",
      password
   }
 )
 const findUser = await User.findById(userdb._id).select("-password -refreshToken")
 if (!findUser) {
   throw new ApiError(500,"Something went wrong");
 }

 return res.status(201).json(
   new ApiResponse(201, findUser, 'User Created succesfully')
 )
})

export default registerUser;