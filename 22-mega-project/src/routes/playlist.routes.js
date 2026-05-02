import { Router } from "express"
import { createPlaylist, getUserPlaylists, getPlaylistById, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist, updatePlaylist } from "../controllers/playlist.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/playlists").post(verifyJWT, createPlaylist)
router.route("/playlists").get(verifyJWT, getUserPlaylists)
router.route("/playlists/:playlistId").get(getPlaylistById)
router.route("/playlists/:playlistId/videos/:videoId").post(verifyJWT, addVideoToPlaylist)
router.route("/playlists/:playlistId/videos/:videoId").delete(verifyJWT, removeVideoFromPlaylist)
router.route("/playlists/:playlistId").delete(verifyJWT, deletePlaylist)
router.route("/playlists/:playlistId").patch(verifyJWT, updatePlaylist)

export default router
