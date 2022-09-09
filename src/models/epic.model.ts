import mongoose, { Schema } from "mongoose";

const epicSchema = new mongoose.Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    require: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
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
  boards: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
});

const Epic = mongoose.model("Epic", epicSchema);

export default Epic;
