import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import { verifyToken } from "../jwt";

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
      tokenData = verifyToken(req.headers.authorization.split(" ")[1]);
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
