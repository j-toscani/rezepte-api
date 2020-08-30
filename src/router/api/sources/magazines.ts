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

router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const id = req.params.id;
    if (!checkMongooseId(id)) throw "Not a valid ID";
    const updatedMagazine = magazines.updateMagazine(id, updates);
    if (!updatedMagazine) throw "Magazine not found";
    res.status(200).send(updatedMagazine);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!checkMongooseId(id)) throw "No valid ID";

    const deleted = await magazines.deleteMagazine(id);
    if (!deleted) throw "Item not found";

    res.status(200).send(deleted);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
