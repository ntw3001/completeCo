import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ApiError } from '../utils/api-error.js';
import { sendMail } from '../utils/mail.js';

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false })

  await sendMail({
    to: user.email,
    subject: 'New Login Detected',
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unhashedToken}`)
  })

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry'
  )

  if(!createdUser) {
    throw new ApiError(500, 'Error retrieving user after token generation');
  }

  return res
  .status(201)
  .json(
    new ApiResponse(
      200,
      {user: createdUser},
      'User registered successfully'
    )
  )
}

const registerUser = asyncHandler( async (req, res) => {
  const { email, username, password, role } = req.body

  User.findOne({
    $or: [{ email }, { username }]
  })

  if (existingUser) {
    throw new ApiError(400, 'Email or username already in use');
  }

  const user = await User.create({
    email,
    username,
    password,
    isEmailVerified: false,
    role
  })

  const { unhashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;
  await user.save();
})

export { registerUser }
