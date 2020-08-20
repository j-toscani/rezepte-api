// get all recipes
async function getAll() {
  return 'getAll';
}
// get all recipes with certain main ingredients
async function getByIngredients() {
  return 'getByIngredients';
}
// get a recipe
async function getOne() {
  return 'getOne';
}
// change information on a recipe
async function changeOne() {
  return 'changeOne';
}
// add a recipe to a source
async function addOneTo() {
  return 'addOneTo';
}

const Recipe = {
  getAll,
  getByIngredients,
  getOne,
  changeOne,
  addOneTo,
};

export default Recipe;
