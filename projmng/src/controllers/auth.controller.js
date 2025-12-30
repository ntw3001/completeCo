import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ApiError } from '../utils/api-error.js';
import { sendMail, mailgenVerificationMail, mailgenPasswordForgetMail } from '../utils/mail.js';

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(400, 'Email or username already in use');
  }

  const user = await User.create({
    email,
    username,
    password,
    isEmailVerified: false,
    role,
  });

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user.email,
    subject: "Verify your email",
    mailgenContent: mailgenVerificationMail(
      user.username,
      `http://localhost:3000/verify?token=${unhashedToken}`
    ),
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry'
  );

  return res.status(201).json(
    new ApiResponse(
      200,
      { user: createdUser },
      'User registered successfully'
    )
  );

});


export { registerUser }
