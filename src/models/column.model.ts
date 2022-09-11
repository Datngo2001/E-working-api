import mongoose, { Schema } from "mongoose";

const columnSchema = new mongoose.Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
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
  order: {
    type: Number,
  },
});

const Column = mongoose.model("Column", columnSchema);

export default Column;
