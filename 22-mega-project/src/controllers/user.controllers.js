import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { deleteFromCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

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
      coverImage: coverImage,
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

const logoutUser = asyncHandler ( async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {new: true}
  )

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json( new ApiResponse(200, {}, "Successful logout"))

})

const refreshAccessToken = asyncHandler ( async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if(!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required")
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    const user = await User.findById(decodedToken?._id)

    if(!user) {
      throw new ApiError(401, "Invalid refresh token")
    }

    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid refresh token")
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    }

    const {accessToken, refreshToken: newRefreshToken} =
      await generateAccessAndRefreshToken(user._id)

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
          new ApiResponse(
            200, ({accessToken, refreshToken: newRefreshToken}, "Access token refreshed :)")
          )
        )
  } catch (error) {
    throw new ApiError(500, "Refreshing the access token didn't work")
  }
})

const changeCurrentPassword = asyncHandler( async (req, res) => {
  const {oldPassword, newPassword} = req.body

  const user = await User.findById(req.user?._id)

  const isPasswordValid = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordValid) {
    throw new ApiError(401, "Old assword bad >:(")
  }

  user.password = newPassword
  await user.save({ validateBeforeSave: false})

  return res.status(200).json(new ApiResponse(200, {}, "Nice password, better than the old one"))
})

const getCurrentUser = asyncHandler( async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "Current user details"))
})

const updateAccountDetails = asyncHandler( async (req, res) => {
  const {fullname, email} = req.body

  if(!fullname || !email){
    throw new ApiError(400, "Full name and email are required")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email: email
      }
    },
    {new: true}
  ).select("-password -refreshToken")

  return res.status(200).json( new ApiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = asyncHandler( async (req, res) => {
  const avatarLocalPath = req.file?.path

  if(!avatarLocalPath) {
    throw new ApiError(400, "Throw me a file though bro")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  if (!avatar.url) {
    throw new ApiError(500, "Something is bad, can't plode the aviatar")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url
      }
    },
    {new: true}
  ).select("-password -refreshToken")

  res.status(200).json(new ApiResponse(200, user, "Avatar updated! Nice!"))
})

const updateUserCoverImage = asyncHandler( async (req, res) => {
  const coverImageLocalPath = req.file?.path

  if(!coverImageLocalPath) {
    throw new ApiError(400, "Throw me a file though bro")
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!coverImage.url) {
    throw new ApiError(500, "Something is bad, can't plode the image :(")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url
      }
    },
    {new: true}
  ).select("-password -refreshToken")

  res.status(200).json(new ApiResponse(200, user, "Cover updated! Nice!"))
})

const getUserChannelProfile = asyncHandler( async (req, res) =>{
  const {username} = req.params

  if(!username?.trim()){
    throw new ApiError(400, "Username is ned")
  }

  const channel = await User.aggregate(
    [
      {
        $match: {
          username: username?.toLowerCase()
        }
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "channel",
          as: "subscribers"
        }
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "subscriber",
          as: "subscribedTo"
        }
      },
      {
        $addFields: {
          subscriberCount: {
            $size: "$subscribers"
          },
          channelsSubscribedToCount: {
            $size: "$subscribedTo"
          },
          isSubscribed: {
            $cond: {
              if: {
                $in: [req.user?._id, "$subscribers.subscriber"]
              },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $project: {
          fullname: 1,
          username: 1,
          avatar: 1,
          subscrberCount: 1,
          channelsSubscribedToCount: 1,
          isSubscribed: 1,
          coverImage: 1,
          email: 1
        }
      }
    ]
  )

  if (!channel.length){
    throw new ApiError(404, "Channel remains unfound")
  }

  return res.status(200).json( new ApiResponse(
    200,
    channel[0],
    "Channel profile is get!"
  ))

})

const getWatchHistory = asyncHandler( async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user?._id)
      }
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullname: 1,
                    username: 1,
                    avatar: 1
                  }
                }
              ]
            }
          },
          {
            $addFields: {
              owner: {
                $first: "$owner"
              }
            }
          }
        ]
      }
    }
  ])

  return res.status(200).json( new ApiResponse(200, user[0]?.watchHistory, "Watch history effetched"))
})

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory
}
