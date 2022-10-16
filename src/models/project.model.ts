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
  members: [
    {
      type: String,
      ref: "User",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
