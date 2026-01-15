import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getcurrentUser, verifyEmail, refreshAccessToken, forgotPassword, forgotPasswordReset, didntForgetPasswordReset, resendEmailVerification } from '../controllers/auth.controller.js';
import { userRegisterValidator, userLoginValidator, userForgotPasswordValidator, userResetPasswordValidator, userchangeCurrentPasswordValidator } from '../validators/index.js';
import { validate } from '../middleware/validator.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

// unsecured routes
router.route('/register').post(userRegisterValidator(), validate, registerUser);
router.route('/login').post(userLoginValidator(), validate, loginUser);
router.route('/verify-email/:verificationToken').get(verifyEmail);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/forgot-password').post(userForgotPasswordValidator(), validate, forgotPassword);
router.route('/forgot-password-reset/:resetToken').post(userResetPasswordValidator(), validate, forgotPasswordReset);


// secured routes
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/current-user').get(verifyJWT, getcurrentUser);
router.route('/change-current-password').post(verifyJWT, userchangeCurrentPasswordValidator(), validate, didntForgetPasswordReset);
router.route('resend-verification-email').post(verifyJWT, resendEmailVerification);

export default router;
