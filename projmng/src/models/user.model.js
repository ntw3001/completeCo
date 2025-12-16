import mongoose, { Schema } from 'mongoose';

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

export const User = mongoose.model('User', UserSchema);
