import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { deleteFromCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler( async (req, res) => {
  const { fullname, email, username, password } = req.body

  if([fullname, username, email, password].some((field) => field?.trim() === "")
  ){
    throw new ApiError(400, "all fields is want I'm afraid")
  }
  const existingUser = await User.findOne({
    $or: [{username}, {email}]
  })

  if(existingUser) {
    throw new ApiError(409, "User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path

  if(!avatarLocalPath) {
    throw new ApiError(400, "Give avatar")
  }

  let avatar
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("avatarLocalPath:", avatarLocalPath)
    console.log("uploaded avatar", avatar)
  } catch (error) {
    console.log("Error uploading avatar", error)
    throw new ApiError(500, "NO PLODE AVIATAR")
  }

  let coverImage
  if (coverImageLocalPath) try {
    const uploadedCover = await uploadOnCloudinary(coverImageLocalPath)
    coverImage = uploadedCover?.url || ""
    console.log("uploaded cover image", coverImage)
    console.log("coverImageLocalPath:", coverImageLocalPath)
  } catch (error) {
    console.log("Error uploading cover image", error)
    throw new ApiError(500, "NO PLODE COER IMAGINE")
  }


  try {
    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage.url,
      email,
      password,
      username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )

    if (!createdUser) {
      throw new ApiError(500, "no register user }:[")
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User made :)"))

  } catch (error) {
    console.log("user creation failed")

    if (avatar) {
      await deleteFromCloudinary(avatar.public_id)
    }
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id)
    }

    throw new ApiError(500, "Didn't register user, images deleted >:(")
  }
})

export {
  registerUser
}
