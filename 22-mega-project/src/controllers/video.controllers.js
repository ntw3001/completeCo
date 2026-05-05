import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { Like } from "../models/like.model.js"
import { Comment } from "../models/comment.model.js"
import { Playlist } from "../models/playlist.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
  const pageNum = parseInt(page) || 1
  const limitNum = Math.min(parseInt(limit) || 10, 50)
  const skip = (pageNum - 1) * limitNum

  const filter = { isPublished: true }

  if (query) {
    filter.title = { $regex: query, $options: "i" }
  }

  if (userId && isValidObjectId(userId)) {
    filter.owner = userId
  }

  const allowedSortFields = ["createdAt", "views", "title"]
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt"
  const sortDirection = sortType === "asc" ? 1 : -1
  const sort = { [sortField]: sortDirection }

  const videos = await Video.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limitNum)
    .select("videoFile thumbnail title views owner createdAt")
    .populate("owner", "username avatar")

  const total = await Video.countDocuments(filter)

  return res.status(200).json(
    new ApiResponse(200, {
      videos,
      page: pageNum,
      limit: limitNum,
      total
    }, "Videos fetched")
  )

})

const publishVideo = asyncHandler(async (req, res) => {
  const { title, description} = req.body
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!title || title.trim().length < 3) {
    throw new ApiError(400, "Title too short")
  }

  if (!description || description.trim().length < 3) {
    throw new ApiError(400, "Description too short")
  }

  const videoPath = req.files?.videoFile?.[0]?.path
  const thumbnailPath = req.files?.thumbnail?.[0]?.path

  if (!videoPath || !thumbnailPath) {
    throw new ApiError(400, "Video and thumbnail required")
  }

  let uploadedVideo, uploadedThumbnail

  try {
    uploadedVideo = await uploadOnCloudinary(videoPath)
    uploadedThumbnail = await uploadOnCloudinary(thumbnailPath)

    if (
      !uploadedVideo?.secure_url || !uploadedVideo?.public_id ||
      !uploadedThumbnail?.secure_url || !uploadedThumbnail?.public_id
    ) {
      throw new ApiError(500, "Upload failed")
    }

    const video = await Video.create({
      videoFile: {
        url: uploadedVideo.secure_url,
        publicId: uploadedVideo.public_id
      },
      thumbnail: {
        url: uploadedThumbnail.secure_url,
        publicId: uploadedThumbnail.public_id
      },
      title: title.trim(),
      description: description.trim(),
      owner: userId
    })

    return res.status(201).json(
      new ApiResponse(201, video, "Video published")
    )

  } catch (err) {
    try {
      if (uploadedVideo?.public_id) {
        await deleteFromCloudinary(uploadedVideo.public_id)
      }
      if (uploadedThumbnail?.public_id) {
        await deleteFromCloudinary(uploadedThumbnail.public_id)
      }
    } catch (cleanupErr) {
      console.error("Rollback failed", cleanupErr)
    }

    throw err
  }
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
    .select("videoFile thumbnail title views owner description createdAt")
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

  const thumbnailPath = req.files?.thumbnail?.[0]?.path

  if (thumbnailPath) {
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailPath)
    if (!uploadedThumbnail?.secure_url || !uploadedThumbnail?.public_id) {
      throw new ApiError(500, "Thumbnail upload failed")
    }
    if (video.thumbnail?.publicId) {
      await deleteFromCloudinary(video.thumbnail.publicId)
    }
    updateData.thumbnail = {
      url: uploadedThumbnail.secure_url,
      publicId: uploadedThumbnail.public_id
    }
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
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID")
  }

  const video = await Video.findById(videoId)

  if (!video) {
    throw new ApiError(404, "That video done gone")
  }

  if (video.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to delete this video")
  }

  try {
    if (video.videoFile?.publicId) {
      await deleteFromCloudinary(video.videoFile.publicId)
    }
    if (video.thumbnail?.publicId) {
      await deleteFromCloudinary(video.thumbnail.publicId)
    }
  } catch (err) {
    console.error("Cloudinary cleanup failed", err)
  }

  await video.deleteOne()

  await Promise.allSettled([
    Like.deleteMany({ video: videoId }),
    Comment.deleteMany({ video: videoId }),
    Playlist.updateMany(
      { videos: videoId },
      { $pull: { videos: videoId } }
    )
  ])

  return res.status(200).json(
    new ApiResponse(200, {}, "Video removed")
  )
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
