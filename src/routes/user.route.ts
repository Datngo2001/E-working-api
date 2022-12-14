import User from "../models/user.model";
import express from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const UserRouter = express.Router();

// Have to login to use all endpoint
UserRouter.use(needloginMiddleware);

UserRouter.get("/find-users/:email", async (req: RequestWithUser, res) => {
  try {
    const users = await User.find({
      email: { $regex: req.params.email },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

UserRouter.post("/sync-with-firebase", async (req: RequestWithUser, res) => {
  try {
    let user;
    if (await User.exists({ _id: req.user.uid })) {
      const { uid, update } = req.user;
      user = await User.findByIdAndUpdate(
        req.user.uid,
        { ...update },
        { new: true }
      );
    } else {
      const newUser = new User(req.user);
      newUser._id = req.user.uid;
      user = await newUser?.save();
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default UserRouter;
