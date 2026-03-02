import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"

const registerUser = asyncHandler( async (req, res) => {
  const { fullName, email, username, password } = req.body

  if([fullName, username, email, password].some((field) => field?.trim() === "")
  ){
    throw new ApiError(400, "all fields is want I'm afraid")
  }
})

export {
  registerUser
}
