import mongoose from "mongoose"
import { Comment } from "../models/comment.models.js"
import { Video } from "../models/video.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query



})

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  const userId = req.user?._id
  const content = req.body.content

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID")
  }

  const video = await Video.findById(videoId)

  if(!video) {
    throw new ApiError(404, "Video not found")
  }

  if ((!content) || (content.trim().length < 3)) {
    throw new ApiError(400, "Got to send at least 3 characters")
  }

  const comment = await Comment.create({
    content,
    video: videoId,
    user: userId
  })

  return res.status(201).json(
    new ApiResponse(201, comment, "Comment added")
  )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID")
  }

  const comment = await Comment.findById(commentId)

  if (!comment) {
    throw new ApiError(404, "Looks like someone else got to it first")
  }

  if (comment.user.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to delete this comment")
  }

  await Comment.findByIdAndDelete(commentId)

  return res.status(200).json(
    new ApiResponse(200, {}, "Comment removed")
  )
})

export {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment
}
