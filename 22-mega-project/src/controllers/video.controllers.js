import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
})

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID")
  }

  const video = await Video.findOne({
    _id: videoId,
    isPublished: true
  })
    .select("vid`eoFile thumbnail title views owner description createdAt")
    .populate("owner", "username fullname avatar")

  if (!video) {
    throw new ApiError(404, "Video not found")
  }

  return res.status(200).json(
    new ApiResponse(
      200, video, "Video found"
    )
  )
})

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  const {description} = req.body
  const userId = req.user?._id
  const updateData = {}

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID")
  }

  const video = await Video.findById(videoId)

  if (!video) {
    throw new ApiError(404, "No video here sorry")
  }

  if (video.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Editing this video is not for you")
  }

  if (description !== undefined) {
    const trimmed = description.trim()
    if (trimmed.length < 3) {
      throw new ApiError(400, "Description too short")
    }
    updateData.description = trimmed
  }

  if (req.file) {
    const uploadedThumbnail = await uploadOnCloudinary(req.file.path)
    if (!uploadedThumbnail?.url) {
      throw new ApiError(500, "Thumbnail upload failed")
    }
    if (video.thumbnail) {
      await deleteFromCloudinary(video.thumbnail)
    }
    updateData.thumbnail = uploadedThumbnail.url
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "Nothing to update")
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    updateData,
    { new: true }
  )

  return res.status(200).json(
    new ApiResponse(200, updatedVideo, "Vibeo updated")
  )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID")
  }

  const video = await Video.findById(videoId)

  if (!video) {
    throw new ApiError(404, "Video not found")
  }

  if (video.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Not allowed to modify this video")
  }

  video.isPublished = !video.isPublished
  await video.save()

  return res.status(200).json(
    new ApiResponse(
      200,
      { isPublished: video.isPublished },
      video.isPublished ? "Video unleashed" : "Video withdrawn"
    )
  )

})

export {
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
