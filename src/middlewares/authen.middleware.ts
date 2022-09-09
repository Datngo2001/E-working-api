import { SECRET_KEY } from "../config";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { RequestWithUser } from "interfaces/auth.interface";

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
      tokenData = await jsonwebtoken.verify(
        req.headers.authorization.split(" ")[1],
        SECRET_KEY
      );
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
