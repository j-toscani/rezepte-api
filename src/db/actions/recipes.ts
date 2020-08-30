import Recipe, { RecipeModel } from "../models/Recipe";

// create new recipe entry
export async function createRecipe(recipe: Recipe) {
  const now = new Date();
  recipe.createdAt = now;
  recipe.updatedAt = now;

  const recipeModel = await RecipeModel.create(recipe);
  const savedRecipe = await recipeModel.save();
  return savedRecipe;
}

// get all recipes
export async function findAllRecipes(options: {} = {}) {
  const recipeModels = await RecipeModel.find(options);
  if (recipeModels.length < 1) return null;
  const populatedRecipes = recipeModels.map((recipeModel) =>
    recipeModel.execPopulate()
  );
  const recipes = await Promise.all(populatedRecipes);
  return recipes;
}

// get a random recipe

// get all recipes with certain tag

// get recipe by name

// get all recipes in books

// get all recipes from websites

// get all recipes from magazines

// get all recipes from a certain issue

const recipes = {
  createRecipe,
  findAllRecipes,
};

export default recipes;
