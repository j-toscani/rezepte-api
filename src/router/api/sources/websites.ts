import { Router } from "express";
import checkMongooseId from "../../../lib/checkMongooseId";
import websites from "../../../db/actions/websites";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allWebsites = await websites.findAllWebsitesWith();
    if (allWebsites?.length === 0)
      throw "There are no Websites in your Database";
    res.status(200).send(allWebsites);
  } catch (error) {
    res.status(403).send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!checkMongooseId(id)) throw "Not a valid ID";

    const website = await websites.findWebsite(id);
    if (!website) throw "Webiste not found";

    res.status(200).send(website);
  } catch (error) {
    res.status(403).send({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const website = req.body;
    const savedWebsite = await websites.createWebsite(website);
    res.status(200).send(savedWebsite);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const id = req.params.id;
    if (!checkMongooseId(id)) throw "Not a valid ID";

    const updatedWebsite = websites.updateWebsite(id, updates);
    if (!updatedWebsite) throw "Webiste not found";

    res.status(200).send(updatedWebsite);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
