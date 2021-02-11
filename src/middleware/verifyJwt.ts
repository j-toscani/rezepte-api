import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyJwt(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers["authorization"];

  if (!authHeader) {
    response.status(401).send("Auth Header missing.");
    return;
  }

  const token = authHeader.split(" ")[1];
  if (token == null) return response.sendStatus(401);

  if (!process.env.SECRET) {
    throw new Error("NO SECRET PROVIDED");
  }

  jwt.verify(token, process.env.SECRET, (error, _user) => {
    if (error) return response.sendStatus(403);
    next();
  });
}
