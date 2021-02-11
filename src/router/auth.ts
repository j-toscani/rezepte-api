import { Router } from "express";
import { verify } from "../core/HashPW";
import jwt from "jsonwebtoken";
import { findUser, createUser } from "../db/actions/user";

const router = Router();
//Authentication Routes
router.post(`/auth/register`, async (request, response) => {
  const { name, password } = request.body;
  const hasPasswordAndName =
    name &&
    password &&
    typeof name === "string" &&
    typeof password === "string";

  if (!hasPasswordAndName) {
    response.status(400).send("No sufficient data.");
    return;
  }
  try {
    const user = await createUser({ name, password });

    if (user) {
      response.status(200).send(`User ${user.name}, created!`);
    }
  } catch (err) {
    response.status(400).send(err);
    return;
  }
});

router.post(`/auth/login`, async (request, response) => {
  const { name, password } = request.body;
  const hasPasswordAndName =
    name &&
    password &&
    typeof name === "string" &&
    typeof password === "string";

  if (!hasPasswordAndName) {
    response.status(400).send("No sufficient data.");
    return;
  }
  try {
    const user = await findUser({ name, password });

    if (!user) {
      response.status(404).send("User not found.");
    }

    const verified = verify(password, user[0].password);

    if (!verified) {
      response.status(401).send("Wrong password or Username.");
    }

    const token = jwt.sign(name, process.env.SECRET || "mysupersecretsectet");

    response.status(200).send(token);
  } catch (err) {
    response.status(400).send(err);
    return;
  }
});
