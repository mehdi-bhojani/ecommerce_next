import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  // Add any other fields you need
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  // Add any other fields you need
}, {
  timestamps: true,
});

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export { UserModel};