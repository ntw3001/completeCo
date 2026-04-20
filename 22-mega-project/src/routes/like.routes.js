import { Router } from "express"
import { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos }from "../controllers/like.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/likedvideos").get(verifyJWT, getLikedVideos)
router.route("/videos/:videoId/like").post(verifyJWT, toggleVideoLike)
router.route("/comments/:commentId/like").post(verifyJWT, toggleCommentLike)
router.route("/tweets/:tweetId/like").post(verifyJWT, toggleTweetLike)

export default router
