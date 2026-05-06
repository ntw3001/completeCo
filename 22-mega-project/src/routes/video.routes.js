import { Router } from "express"
import { getAllVideos, publishVideo, getVideoById, updateVideo, deleteVideo, togglePublishStatus } from "../controllers/video.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/videos").post(verifyJWT, publishVideo)
router.route("/videos").get(getAllVideos)
router.route("/videos/:videoId").get(getVideoById)
router.route("/videos/:videoId").delete(verifyJWT, deleteVideo)
router.route("/videos/:videoId").patch(verifyJWT, updateVideo)
router.route("/videos/:videoId/publish-status").patch(verifyJWT, togglePublishStatus)

export default router
