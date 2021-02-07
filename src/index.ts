import express, { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
// import { ApiError, InternalError } from "./core/ApiError";
import cors from "cors";
import router from "./router/router";
import startDB from "./db/db";

export const app = express();

dotenv.config();

const dbUrl = process.env.DB_URL || "http://localhost:27017";
const port = process.env.PORT || 3000;

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(router);

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    ApiError.handle(new InternalError(err.message), res);
  }
}); */

export const startServer = () => {
  const promise = new Promise((res, rej): void => {
    try {
      app.listen(port, () => {
        console.log(`Server listening on ${port}`);
        console.log(`Server Adress: http://localhost:${port}`);
        res(undefined);
      });
    } catch (err) {
      console.log(err, "Server was not able to start");
      rej();
    }
  });
  return promise;
};

startServer()
  .then(() => startDB(dbUrl))
  .catch(() => {});
