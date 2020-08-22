import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from Recipes");
});

router.post("/", (req, res) => {
  console.log(`Content of Body: ${req.body.message}`);
  res.send("Thannk you from Recipes");
});

export default router;
