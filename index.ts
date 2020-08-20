import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

export const app = express();

const db = process.env.DB_URL || "http://localhost:27017";
const port = process.env.PORT || 3000;

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send({ mesage: "Ok" });
});

export const start = () => {
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
};
