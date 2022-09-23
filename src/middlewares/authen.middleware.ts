import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import { verifyToken } from "../firebase/auth";

export default async function authenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const [prefix, token] = req.headers.authorization.split(" ");
  if (req.headers && req.headers.authorization && prefix === "Bearer") {
    let tokenData;
    const reqWithUser = req as RequestWithUser;
    try {
      tokenData = await verifyToken(token);
      reqWithUser.user = tokenData;

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
}
