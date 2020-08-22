import express from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
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

export const startServer = () => {
  const promise = new Promise((res, rej) => {
    try {
      app.listen(port, () => {
        console.log(`Server listening on ${port}`);
        res();
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
