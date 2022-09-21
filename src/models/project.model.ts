import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: false,
  },
  createDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
  creator: {
    type: String,
    require: true,
    ref: "User",
  },
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
