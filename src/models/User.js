import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model("User", userSchema);

export default User;