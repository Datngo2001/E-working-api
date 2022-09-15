import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: false,
  },
  photoUrl: {
    type: String,
    require: false,
  },
  email_verified: {
    type: Boolean,
    require: true,
  },
  // google user id
  uid: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
