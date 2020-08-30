import { Router } from "express";
import recipes from "../../db/actions/recipes";

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
    const savedRecipe = await recipes.createRecipe(recipe);
    res.status(200).send(savedRecipe);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
