import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHasch: {
      type: String,
      required: true,
    },
    avatarUrl: Buffer,
    birthDate: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
