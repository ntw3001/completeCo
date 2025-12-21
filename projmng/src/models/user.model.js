import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  avatar: { type: {url: String, localPath: String}, default: {url: 'https://placehold.co/200x200', localPath: ''}, required: false },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: String, trim: true },
  isEmailVerified: { type: Boolean, default: false },
  refreshToken: { type: String},
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
  emailVerificationToken: { type: String },
  emailVerificationTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next()
  await bcrypt.hash(this.password, 10)
  next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = function() {
    return jwt.sign(
      {
        _id: this._id,
        __email: this.email,
        _username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    )
}

UserSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  )
}


UserSchema.methods.generateTemporaryToken = function() {
  const unhashedToken = crypto
    .randomBytes(32)
    .toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(unhashedToken)
    .digest('hex');
  const tokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

  return { unhashedToken, hashedToken, tokenExpiry };
}

export const User = mongoose.model('User', UserSchema);
