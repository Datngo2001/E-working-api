import mongoose, { Schema } from "mongoose";

const stageSchema = new mongoose.Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    require: true,
  },
  creator: {
    type: String,
    require: true,
  },
  createDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
  name: {
    type: String,
  },
  startDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

const Stage = mongoose.model("Stage", stageSchema);

export default Stage;
