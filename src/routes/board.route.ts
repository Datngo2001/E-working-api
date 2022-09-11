import Board from "../models/board.model";
import express from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const BoardRouter = express.Router();

// Have to login to use all endpoint
BoardRouter.use(needloginMiddleware);

BoardRouter.get("/stage/:stageId", async (req: RequestWithUser, res) => {
  try {
    const boards = await Board.find({ stage: req.params.stageId });
    res.json(boards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

BoardRouter.put("/:boardId", async (req: RequestWithUser, res) => {
  try {
    const result = await Board.findOneAndUpdate(
      {
        _id: req.params.boardId,
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

export default BoardRouter;
