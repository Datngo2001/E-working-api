import User from "../models/user.model";
import express from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const UserRouter = express.Router();

// Have to login to use all endpoint
UserRouter.use(needloginMiddleware);

UserRouter.post("/sync-with-firebase", async (req: RequestWithUser, res) => {
  try {
    const user = new User(req.user);
    user._id = req.user.uid;
    const result = await user?.save();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default UserRouter;
