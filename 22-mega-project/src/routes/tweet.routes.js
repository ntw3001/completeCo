import { Router } from "express"
import { getUserTweets, createTweet, updateTweet, deleteTweet } from "../controllers/tweet.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/tweets").get(verifyJWT, getUserTweets)
router.route("/:tweets").post(verifyJWT, createTweet)
router.route("/tweets/:tweetId").patch(verifyJWT, updateTweet)
router.route("/tweets/:tweetId").delete(verifyJWT, deleteTweet)

export default router
