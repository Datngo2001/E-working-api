import mongoose, { Schema } from "mongoose";

const boardSchema = new mongoose.Schema({
  epic: {
    type: Schema.Types.ObjectId,
    ref: "Epic",
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
  columns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Column",
    },
  ],
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
