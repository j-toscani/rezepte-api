import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

export const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/data", (req, res) => {
  res.send({ message: "Hello" });
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send({ mesage: "Ok" });
});

export const start = () => {
  app.listen(3000, () => {
    console.log("Server is on 3000");
  });
};
