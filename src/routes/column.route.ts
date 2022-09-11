import Column from "../models/column.model";
import express from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const ColumnRouter = express.Router();

// Have to login to use all endpoint
ColumnRouter.use(needloginMiddleware);

ColumnRouter.get("/board/:boardId/all", async (req: RequestWithUser, res) => {
  try {
    const columns = await Column.find({ project: req.params.boardId }).sort({
      order: "asc",
    });
    res.json(columns);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ColumnRouter.post("/", async (req: RequestWithUser, res) => {
  try {
    const column = new Column(req.body);
    column.creator = req.user._id;

    const result = await column?.save();

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ColumnRouter.put("/:columnId", async (req: RequestWithUser, res) => {
  try {
    const result = await Column.findOneAndUpdate(
      {
        _id: req.params.columnId,
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

ColumnRouter.delete("/:columnId", async (req: RequestWithUser, res) => {
  try {
    const result = await Column.findOneAndDelete({
      _id: req.params.columnId,
    });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default ColumnRouter;
