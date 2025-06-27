import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs'; // For password hashing

// Define the User interface, extending Mongoose's Document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional because it might be excluded in some queries
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>; // Method for password comparison
}

// Define the User Schema
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensures email addresses are unique
      lowercase: true, // Stores email in lowercase
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Basic email format validation
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Prevents password from being returned in queries by default
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, 'Please use a valid 10-digit phone number'], // Basic 10-digit phone number validation
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Mongoose pre-save hook to hash the password before saving a new user or updating password
UserSchema.pre<IUser>('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password!, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  // Compare the plain text password with the hashed password stored in the database
  return await bcrypt.compare(enteredPassword, this.password!);
};

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;