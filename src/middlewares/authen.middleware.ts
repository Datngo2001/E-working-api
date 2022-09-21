import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import { verifyToken } from "../firebase/auth";

export default async function authenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    let tokenData;
    const reqWithUser = req as RequestWithUser;
    try {
      tokenData = await verifyToken(req.headers.authorization.split(" ")[1]);
      reqWithUser.user = tokenData;

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    next();
  }
}
