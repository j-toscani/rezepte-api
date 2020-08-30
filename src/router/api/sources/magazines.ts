import { Router } from "express";
import checkMongooseId from "../../../lib/checkMongooseId";
import magazines from "../../../db/actions/magazines";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allMagazines = await magazines.findAllMagazinesWith();
    if (allMagazines?.length === 0)
      throw "There are no Magazines in your Database";
    res.status(200).send(allMagazines);
  } catch (error) {
    res.status(403).send({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const magazine = req.body;
    const newMagazine = await magazines.createMagazine(magazine);
    res.status(200).send(newMagazine);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
