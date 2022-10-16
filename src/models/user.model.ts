import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: false,
  },
  picture: {
    type: String,
    require: false,
  },
  email_verified: {
    type: Boolean,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
