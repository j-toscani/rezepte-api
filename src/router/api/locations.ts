import { Router } from "express";
import locations from "../../db/actions/locations";
import checkMongooseId from "../../lib/checkMongooseId";

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

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    if (!checkMongooseId(id)) throw "Not a valid ID";

    const updatedLocation = await locations.updateLocation(id, updates);
    if (!updatedLocation) throw "Location not Found";

    res.status(200).send(updatedLocation);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!checkMongooseId(id)) throw "No valid ID";

    const deleted = await locations.deleteLocation(id);
    if (!deleted) throw "Item not found";

    res.status(200).send(deleted);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
