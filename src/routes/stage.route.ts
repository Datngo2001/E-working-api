import Stage from "../models/stage.model";
import Board from "../models/board.model";
import express from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const StageRouter = express.Router();

// Have to login to use all endpoint
StageRouter.use(needloginMiddleware);

StageRouter.get(
  "/project/:projectId/all",
  async (req: RequestWithUser, res) => {
    try {
      const stages = await Stage.find({ project: req.params.projectId });
      res.json(stages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

StageRouter.post("/", async (req: RequestWithUser, res) => {
  try {
    const stage = new Stage(req.body);
    stage.creator = req.user.uid;

    const result = await stage?.save();

    const board = new Board({ stage: result._id });
    await board?.save();

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

StageRouter.put("/:stageId", async (req: RequestWithUser, res) => {
  try {
    const result = await Stage.findOneAndUpdate(
      {
        _id: req.params.stageId,
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

StageRouter.delete("/:stageId", async (req: RequestWithUser, res) => {
  try {
    const result = await Stage.findOneAndDelete({
      _id: req.params.projectId,
    });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default StageRouter;
