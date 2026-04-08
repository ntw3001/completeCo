import { Router } from "express"
import { toggleSubscription, getSubscribedChannels, getUserChannelSubscribers }from "../controllers/subscription.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/channel/:channelId").get(getUserChannelSubscribers)
router.route("/user/:subscriberId").get(getSubscribedChannels)
router.route("/togglesub/:channelId").post(verifyJWT, toggleSubscription)

export default router
