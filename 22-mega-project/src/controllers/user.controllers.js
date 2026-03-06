import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler( async (req, res) => {
  const { fullName, email, username, password } = req.body

  if([fullName, username, email, password].some((field) => field?.trim() === "")
  ){
    throw new ApiError(400, "all fields is want I'm afraid")
  }
  const existingUser = await User.findOne({
    $or: [{username}, {email}]
  })

  if(existingUser) {
    throw new ApiError(409, "User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if(!avatarLocalPath) {
  throw new ApiError(409, "Give avatar")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  let coverImage = ""
  if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImage)
  }

  await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url,
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUer) {
    throw new ApiError(500, "no register user }:[")
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User made :)"))

})

export {
  registerUser
}
