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
    owner: owner
  })

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Chirped"))

})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
