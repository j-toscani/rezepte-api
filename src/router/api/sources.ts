import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from Sources");
});

router.post("/", (req, res) => {
  console.log(`Content of Body: ${req.body.message}`);
  res.send("Thannk you from Sources");
});

export default router;
