import { User } from '../models/user.model.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies ? req.cookies.accessToken || req.header('Authorization').replace('Bearer ', '') : null

  if (!token) {
    throw new ApiError(401, 'Unauthorized request')
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = User.findById(decodedToken?._id).select(
          '-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry'
      )
    if (!user) {
      throw new ApiError(401, 'Invalid access token')
    }
    req.user = user
    next()

  } catch (error) {
    throw new ApiError(401, 'Invalid access token')
  }
})
