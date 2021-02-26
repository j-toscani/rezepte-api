import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).send("Auth Header missing.");
    return;
  }

  const token = authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  if (!process.env.SECRET) {
    throw new Error("NO SECRET PROVIDED");
  }

  jwt.verify(token, process.env.SECRET, (error, _user) => {
    if (error) return res.sendStatus(403);
    next();
  });
}
