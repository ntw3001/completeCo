import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
  const userId = req.user?._id
  const { content } = req.body

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

    if (!content || content.trim().length < 1) {
  throw new ApiError(400, "Gotta chirp something")
  }


  const tweet = await Tweet.create({
    content: content,
    owner: userId
  })

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Chirped"))

})

const getUserTweets = asyncHandler(async (req, res) => {
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  const tweets = await Tweet.find({ owner: userId })
    .sort({ createdAt: -1 })

  return res.status(200).json(
    new ApiResponse(200, tweets, "Tweets fetched")
  )
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    const { content } = req.body
    const userId = req.user?._id

    if (!userId) {
      throw new ApiError(401, "Unauthorized")
    }

    if (!isValidObjectId(tweetId)) {
      throw new ApiError(400, "Invalid tweet ID")
    }

    if (!content || content.trim().length < 3) {
      throw new ApiError(400, "Content must be at least 3 characters")
    }

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) {
      throw new ApiError(404, "This tweet has already been devoured")
    }

    if (tweet.owner.toString() !== userId.toString()) {
      throw new ApiError(403, "You no have permission to edit this tweet")
    }

    await Tweet.findByIdAndUpdate(
      tweetId,
      {content},
      {new: true}
    )

    return res.status(200).json(
      new ApiResponse(200, {}, "Tweet updated")
    )
})

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet ID")
  }

  const tweet = await Tweet.findById(tweetId)

  if (!tweet) {
    throw new ApiError(404, "Looks like someone else got to it first")
  }

  if (tweet.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to delete this tweet")
  }

  await Tweet.findByIdAndDelete(tweetId)

  return res.status(200).json(
    new ApiResponse(200, {}, "Tweet removed")
  )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
