import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
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
  content: {
    type: String,
  },
  links: [
    {
      type: String,
    },
  ],
  deadline: {
    type: Date,
    require: true,
    default: Date.now,
  },
  assignTo: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
