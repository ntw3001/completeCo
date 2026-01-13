import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ApiError } from '../utils/api-error.js';
import { sendMail, mailgenVerificationMail, mailgenPasswordForgetMail } from '../utils/mail.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
// import { useReducer } from 'react';

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
  const { email, username, password, role } = req.body || {};

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
      `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unhashedToken}`
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body || {};
  if (!email ) {
    throw new ApiError(400, 'Email is required');
  }

  const user = await User.findOne({email});

    if (!user) {
      throw new ApiError(400, 'Nice try, no such person');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(400, 'Incorrect password');
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
      '-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry'
    )

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser },
          'User logged in successfully'
        )
      )
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: ""
      }
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  }
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(
      new ApiResponse(
        200,
        {},
        'User logged out successfully'
      )
  );
})

const getcurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        'Current user fetched successfully'
      )
  )
})

const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  if (!verificationToken) {
    throw new ApiError(400, 'Verification token is required')
  }

  let hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex')

    await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiry: { $gt: Date.now() }
    })

    .then(async (user) => {
      if (!user) {
        throw new ApiError(400, 'Invalid or expired verification token')
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationTokenExpiry = undefined;

      await user.save({ validateBeforeSave: false });

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            {
              isEmailVerified: user.isEmailVerified
            },
            'Email verified successfully'
          )
      )
    })
})

const resendEmailVerification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, 'You do not exist');
  }
  if (user.isEmailVerified) {
    throw new ApiError(400, 'Nah pal you\'re already ok');
  }

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
      `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unhashedToken}`

    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        'I resent that'
      )
  )
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthenticated');
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decodedToken?.id;

    const user = await User.findById(userId);

    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    const option = {
      httpOnly: true,
      secure: true,
    }

    const {accessToken, refreshToken: newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
      user.refreshToken = newRefreshToken;
      await user.save({ validateBeforeSave: false })

      return res
        .cookie('accessToken', accessToken, option)
        .cookie('refreshToken', newRefreshToken, option)
        .status(200)
        .json(
          new ApiResponse(
            200,
            {},
            'Access token refreshed'
          )
      )

  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body || {};

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'No user with that email');
  }

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });

    await sendMail({
      email: user.email,
      subject: "Password Reset Request",
      mailgenContent: mailgenPasswordForgetMail(
        user.username,
        `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${unhashedToken}`

      ),
    });

    return res
      .status(200
        .json(
          new ApiResponse(
            200,
            {},
            'Password reset email sent'
          )
        )
      )
});

const forgotPasswordReset = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body || {};

  let hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() }
    })
    .then(async (user) => {
      if (!user) {
        throw new ApiError(400, 'Invalid or expired password reset token');
      }

      user.password = newPassword;
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;

      await user.save({ validateBeforeSave: false });

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            {},
            'Password reset successfully'
          )
      )
    })
});

const didntForgetPasswordReset = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};

  const user = await User.findById(req.user?._id);

  const isPasswordValid = await user.isPasswordCorrect(currentPassword)

  if(!isPasswordValid) {
    throw new ApiError(400, 'thats not ur password lol')
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        'Password changed successfully'
      )
  )
});

export { registerUser, loginUser, logoutUser, getcurrentUser, verifyEmail, resendEmailVerification, refreshAccessToken, forgotPassword, forgotPasswordReset, didntForgetPasswordReset };
