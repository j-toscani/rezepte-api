import { Router } from "express";

import recipes from "./api/recipes";
import locations from "./api/locations";
import sources from "./api/sources";

const router = Router();

router.use("/", (req, res, next) => {
  res.sendStatus(404);
});

router.use("/api", (req, res, next) => {
  console.log("someone logged in");
  console.log("validation complete");
  next();
});

router.use("/api/locations", locations);
router.use("/api/recipes", recipes);
router.use("/api/sources", sources);

export default router;
