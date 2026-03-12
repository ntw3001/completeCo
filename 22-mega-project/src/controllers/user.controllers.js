import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { deleteFromCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

const generateAccessAndRefreshToken = async (userId) => {
try {
    const user = await User.findById(userId)
      if (!user) {
        throw new ApiError(404, "There is no such user")
      }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})
    return {accessToken, refreshToken}
} catch (error) {
  throw new ApiError(500, "nah generate tokens not work")
}
}

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

const loginUser = asyncHandler( async (req, res) => {
  // get data from body
  const {email, username, password} = req.body

  //validate that all fields are filled
  if(!email) {
    throw new ApiError(400, "give email")
  }
  if(!username) {
    throw new ApiError(400, "username is not")
  }
  if(!password) {
    throw new ApiError(400, "be reasonable")
  }

  const user = await User.findOne({
    $or: [{username}, {email}]
  })

  if(!user) {
    throw new ApiError(404, "user not found")
  }

  //validate password
  const isPasswordValid = await user.isPasswordCorrect(password)

  if(!isPasswordValid) {
    throw new ApiError(401, "invalid assword, ass")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id)
  .select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
      200,
      {user: loggedInUser, accessToken, refreshToken},
      "login successfal :)"
    ))
})

export {
  registerUser,
  loginUser
}
