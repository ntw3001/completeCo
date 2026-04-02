import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  const totalVideos = await Video.countDocuments({ owner: userId })

  const totalSubscribers = await Subscription.countDocuments({
    channel: userId
  })

  const viewsData = await Video.aggregate([
    { $match: { owner: userId } },
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$views" }
      }
    }
  ])

  const totalViews = viewsData[0]?.totalViews || 0

  const likesData = await Like.aggregate([
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video"
      }
    },
    {
      $match: {
        "video.owner": userId
      }
    },
    {
      $count: "totalLikes"
    }
  ])
  const totalLikes = likesData[0]?.totalLikes || 0

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalVideos,
        totalSubscribers,
        totalViews,
        totalLikes
      },
      "Channel stats fetched"
    )
  )
})

const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Not you")
  }

  const allVideos = await Video.find({ owner: userId}).sort({ createdAt: -1 }).select("title thumbnail views createdAt")

  return res.status(200).json(
    new ApiResponse(
      200, allVideos, "Videos founed"
    )
  )
})

export {
    getChannelStats,
    getChannelVideos
    }
