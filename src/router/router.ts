import { Router } from "express";

import recipes from "./api/recipes";
import locations from "./api/locations";
import sources from "./api/sources";
import auth from "./auth";

const router = Router();

router.get("/register", auth);

router.get("/api", (req, res) => {
  console.log("someone logged in");
  console.log("validation complete");
  res.send("You are logged in!");
});

router.use("/api/locations", locations);
router.use("/api/recipes", recipes);
router.use("/api/sources", sources);

export default router;
