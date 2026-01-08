import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
import { userRegisterValidator, userLoginValidator } from '../validators/index.js';
import { validate } from '../middleware/validator.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/register').post(userRegisterValidator(), validate, registerUser);
router.route('/login').post(userLoginValidator(), validate, loginUser);
router.route('/logout').post(verifyJWT, logoutUser);

export default router;
