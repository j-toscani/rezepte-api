import { Router } from "express";
import verifyJwt from "../middleware/verifyJwt";

import recipes from "./api/recipes";
import locations from "./api/locations";
import sources from "./api/sources";
import auth from "./auth";

const router = Router();

router.use("/auth", auth);

router.use(verifyJwt);

router.use("/api/locations", locations);
router.use("/api/recipes", recipes);
router.use("/api/sources", sources);

export default router;
