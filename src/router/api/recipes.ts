import { Router } from "express";
import recipes from "../../db/actions/recipes";
import checkMongooseId from "../../lib/checkMongooseId";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allRecipes = await recipes.findAllRecipes();
    if (allRecipes?.length === 0)
      throw "There are no Websites in your Database";
    res.status(200).send(allRecipes);
  } catch (error) {
    res.status(403).send({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const recipe = req.body;
    if (!req.body.notes) {
      req.body.notes = "keine Notizen";
    }
    const savedRecipe = await recipes.createRecipe(recipe);
    res.status(200).send(savedRecipe);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const id = req.params.id;
    if (!checkMongooseId(id)) throw "Not a valid ID";

    const savedRecipe = await recipes.updateRecipe(id, updates);
    if (!savedRecipe) throw "Recipe not Found";

    res.status(200).send(savedRecipe);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!checkMongooseId(id)) throw "No valid ID";

    const deleted = await recipes.deleteRecipe(id);
    if (!deleted) throw "Item not found";

    res.status(200).send(deleted);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
