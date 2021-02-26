import { Router } from "express";
import { verify } from "../core/HashPW";
import jwt from "jsonwebtoken";

import { findUser, createUser } from "../db/actions/user";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const hasPasswordAndName =
    name &&
    password &&
    typeof name === "string" &&
    typeof password === "string";

  if (!hasPasswordAndName) {
    res.status(400).send("No sufficient data.");
    return;
  }
  try {
    const user = await createUser({ name, password });

    if (user) {
      res.status(200).send(`User ${user.name}, created!`);
    }
  } catch (err) {
    res.status(400).send(err);
    return;
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const hasPasswordAndName = name && password;

  if (!hasPasswordAndName) {
    res.status(400).send("No sufficient data.");
    return;
  }
  try {
    const user = await findUser({ name, password });

    if (!user) {
      res.status(404).send("User not found.");
      return;
    }

    const verified = verify(password, user.password);

    if (!verified) {
      res.status(401).send("Wrong password or Username.");
    }

    if (!process.env.SECRET) {
      throw new Error("NO SECRET PROVIDED");
    }

    const token = jwt.sign(name, process.env.SECRET);

    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send(err);
    return;
  }
});

router.post("/logout", (req, res) => {
  res.status(200).send({ message: "You are logged out, goodbye!" });
});

export default router;
