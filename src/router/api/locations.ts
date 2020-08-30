import { Router } from "express";
import locations from "../../db/actions/locations";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allLocations = await locations.findAllLocationsWith();
    if (allLocations?.length === 0)
      throw "There are no Websites in your Database";
    res.status(200).send(allLocations);
  } catch (error) {
    res.status(403).send({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const location = req.body;
    const savedLocation = await locations.createLocation(location);
    res.status(200).send(savedLocation);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
