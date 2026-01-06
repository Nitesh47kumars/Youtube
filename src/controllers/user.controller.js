import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  console.log("Email:", email);
  console.log("request Body:", req.body);

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Empty Fields Must be Filled!");
  }

  console.log("files:", req.files);

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  console.log("Existed User:", existedUser);

  if (existedUser) {
    throw new ApiError(409, "User Already Exist!");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File is Required!");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400,"Avatar is not Uploaded!");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    cpverImage: coverImage.url?.url || "",
    email,
    password,
    userName: userName.toLowerCase()
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500,"Something Wrong while Registering User")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully!")
  )

});

export { registerUser };
