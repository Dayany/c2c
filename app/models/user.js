import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already in use"],
    trim: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: 3,
  },
  image: {
    type: String,
    required: false,
  },
});

const User = models.User || model("User", userSchema);

export default User;
