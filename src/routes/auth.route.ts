import express from "express";
import User from "../models/user.model";
import { getAuth } from "firebase-admin/auth";
import { createToken } from "../jwt";

const AuthRouter = express.Router();

AuthRouter.post("/verify-google-id-token", async (req, res) => {
  try {
    let result;
    const decodedToken = await getAuth().verifyIdToken(req.body.token);
    const user = await User.findOne({
      email: decodedToken.email,
    });

    // Insert or update user
    if (user) {
      user.$set({
        name: decodedToken.name,
        photoUrl: decodedToken.picture,
        email_verified: decodedToken.email_verified,
        uid: decodedToken.uid,
      });
      result = await user.save();
    } else {
      const newUser = new User({
        email: decodedToken.email,
        name: decodedToken.name,
        photoUrl: decodedToken.picture,
        email_verified: decodedToken.email_verified,
        uid: decodedToken.uid,
      });
      result = await newUser.save();
    }

    const token = createToken(result.toObject());

    return res.json({ user: result, serverAccessToken: token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

export default AuthRouter;
