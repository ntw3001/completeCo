import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
  const {name, description} = req.body
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  const trimmedName = name?.trim()

  if (!trimmedName) {
    throw new ApiError(400, "Needs a nem though doesn't it")
  }

  if (description && description.length > 80) {
    throw new ApiError(400, "Don't need your life story there bruv")
  }

  const playlist = await Playlist.create({
    name: trimmedName,
    owner: userId,
    description: description?.trim() || ""
  })

  return res
    .status(201)
    .json(new ApiResponse(201, playlist, "Playlist made"))

})

const getUserPlaylists = asyncHandler(async (req, res) => {
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(400, "Invalid ID")
  }

  const playlists = await Playlist.find({ owner: userId })
    .sort({ createdAt: -1 })

  return res.status(200).json(
    new ApiResponse(200, playlists, "Lists fetched")
  )
})

const getPlaylistById = asyncHandler(async (req, res) => {
  const {playlistId} = req.params

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID")
  }

  const playlist = await Playlist.findById(playlistId)
    .populate("videos", "title thumbnail owner")

  if (!playlist) {
    throw new ApiError(404, "Playlist not found")
  }

  return res.status(200).json(
    new ApiResponse(
      200, playlist, "Playlist captured"
    )
  )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const {playlistId, videoId} = req.params
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(videoId) || !isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid video or playlist ID")
  }

  const playlist = await Playlist.findById(playlistId)

  if (!playlist) {
    throw new ApiError(404, "Playlist not found")
  }

  if (playlist.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Not authorized")
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $addToSet: { videos: videoId } },
    { new: true }
  )

  return res.status(200).json(
    new ApiResponse(200, updatedPlaylist, "Video added to playlist")
  )

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const {playlistId, videoId} = req.params
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(videoId) || !isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid video or playlist ID")
  }

  const playlist = await Playlist.findById(playlistId)

  if (!playlist) {
    throw new ApiError(404, "Playlist not found")
  }

  if (playlist.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "Not authorized")
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $pull: { videos: videoId } },
    { new: true }
  )

  return res.status(200).json(
    new ApiResponse(200, updatedPlaylist, "Video removed from playlist")
  )

})

const deletePlaylist = asyncHandler(async (req, res) => {
  const {playlistId} = req.params
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID")
  }

  const playlist = await Playlist.findById(playlistId)

  if (!playlist) {
    throw new ApiError(404, "Looks like someone else got to it first")
  }

  if (playlist.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are forbaden to delete this playlist")
  }

  await Playlist.findByIdAndDelete(playlistId)

  return res.status(200).json(
    new ApiResponse(200, {}, "Playlist removed")
  )
})

const updatePlaylist = asyncHandler(async (req, res) => {
  const {playlistId} = req.params
  const {name, description} = req.body
  const userId = req.user?._id
  const updateData = {}

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID")
  }

  const playlist = await Playlist.findById(playlistId)

  if (!playlist) {
    throw new ApiError(404, "There's no playlist here and there never was")
  }

  if (playlist.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You no have permission to edit this playlist")
  }

  if (name) {
    const trimmedName = name.trim()
    if (trimmedName.length < 3) {
      throw new ApiError(400, "Name must be at least 3 characters")
    }
    updateData.name = trimmedName
  }

  if (description !== undefined) {
    updateData.description = description?.trim()
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "Nothing to update")
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    updateData,
    { new: true }
  )

  return res.status(200).json(
    new ApiResponse(200, updatedPlaylist, "Playlist updated")
  )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
