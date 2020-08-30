import Recipe, { RecipeModel } from "../models/Recipe";
import { Types } from "mongoose";
import checkMongooseId from "../../lib/checkMongooseId";

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
    recipeModel.populate("source").execPopulate()
  );
  const recipes = await Promise.all(populatedRecipes);
  return recipes;
}

// get one recipe
export async function findRecipe(id: string) {
  const mongooseId = Types.ObjectId(id);
  const recipe = await RecipeModel.findById(mongooseId).lean();
  return recipe;
}

// update a recipe
export async function updateRecipe(id: string, updates: {}) {
  if (!checkMongooseId(id)) throw "Not a valid ID";
  const recipe = await RecipeModel.findOneAndUpdate(
    { _id: Types.ObjectId(id) },
    { ...updates }
  ).lean();

  return recipe;
}

// get a random recipe
export async function getRandomRecipe() {
  const recipeModels = await RecipeModel.find({}).populate("source").lean();
  if (recipeModels.length < 1) return null;
  const randomEntry =
    recipeModels[Math.floor(Math.random() * recipeModels.length - 1)];

  return randomEntry;
}

// get all recipes in books

// get all recipes from websites

// get all recipes from magazines

// get all recipes from a certain issue

const recipes = {
  createRecipe,
  findAllRecipes,
  updateRecipe,
  findRecipe,
  getRandomRecipe,
};

export default recipes;
