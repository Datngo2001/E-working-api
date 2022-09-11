import express from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import Task from "../models/task.model";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const TaskRouter = express.Router();

// Have to login to use all endpoint
TaskRouter.use(needloginMiddleware);

TaskRouter.get("/column/:columnId/all", async (req: RequestWithUser, res) => {
  try {
    const tasks = await Task.find({ column: req.params.columnId });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

TaskRouter.post("/", async (req: RequestWithUser, res) => {
  try {
    const task = new Task(req.body);
    task.creator = req.user._id;

    const result = await task?.save();

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

TaskRouter.put("/:taskId", async (req: RequestWithUser, res) => {
  try {
    const result = await Task.findOneAndUpdate(
      {
        _id: req.params.taskId,
      },
      {
        ...req.body,
        updateDate: Date.now(),
      },
      {
        new: true,
      }
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

TaskRouter.delete("/:taskId", async (req: RequestWithUser, res) => {
  try {
    const result = await Task.findOneAndDelete({
      _id: req.params.taskId,
    });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default TaskRouter;
