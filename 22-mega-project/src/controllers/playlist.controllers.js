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

    if (description.length > 80) {
    throw new ApiError(400, "Don't need your life story there bruv")
  }

  const playlist = await Playlist.create({
    name: trimmedName,
    owner: userId,
    description: description.trim() || ""
  })

  return res
    .status(201)
    .json(new ApiResponse(201, playlist, "Playlist made"))

})

const getUserPlaylists = asyncHandler(async (req, res) => {
  const {userId} = req.user?._id

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
    //TODO: get playlist by id
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: add video to playlist
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

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
    //TODO: update playlist
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
