import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from Locations");
});

router.post("/", (req, res) => {
  console.log(`Content of Body: ${req.body.message}`);
  res.send("Thank you from Locations");
});

export default router;
