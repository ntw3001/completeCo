import { body } from 'express-validator';

const userRegisterValidator = () => {
  return [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isString()
      .withMessage('Username must be a string')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Dreadful email address'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    // body('fullName')
    //   .trim()
    //   .notEmpty()
    //   .withMessage('Full name is required')
    //   .isString()
    //   .withMessage('Full name must be a string'),
  ];
}

const userLoginValidator = () => {
  return [
    body('email')
      .trim()
      .optional()
      .isEmail()
      .withMessage('Are you sure that\'s your email address?'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('No, give me a password'),
  ];
}

const userchangeCurrentPasswordValidator = () => {
  return [
    body('currentPassword')
      .trim()
      .notEmpty()
      .withMessage('Wats ur old passworm'),
    body('newPassword')
      .trim()
      .notEmpty()
      .withMessage('Wat passworm would be better')
      .isLength({ min: 6 })
      .withMessage('New passworm must be at least 6 segments long'),
  ]
}

const userForgotPasswordValidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address'),
  ]
}

const userResetPasswordValidator = () => {
  return [
    body('newPassword')
      .trim()
      .notEmpty()
      .withMessage('New passworm is required')
      .isLength({ min: 6 })
      .withMessage('New passworm must be at least 6 segments long'),
  ]
}

export {
  userRegisterValidator,
  userLoginValidator,
  userchangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userResetPasswordValidator
}
