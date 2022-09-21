import mongoose, { Schema } from "mongoose";

const boardSchema = new mongoose.Schema({
  stage: {
    type: Schema.Types.ObjectId,
    ref: "Stage",
    require: true,
  },
  creator: {
    type: String,
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
  detail: {
    type: String,
  },
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
