import Magazine, { MagazineModel } from "../models/Magazine";

// get all magazines
export async function findAllMagazinesWith(options: {} = {}) {
  const magazineModels = await MagazineModel.find(options);
  if (magazineModels.length < 1) return null;
  const populatedMagazines = magazineModels.map((magazineModel) =>
    magazineModel.execPopulate()
  );
  const magazines = await Promise.all(populatedMagazines);
  return magazines;
}

// get all issues of a magazine

// create new magazine
export async function createMagazine(magazine: Magazine) {
  const now = new Date();
  magazine.createdAt = now;
  magazine.updatedAt = now;
  const magazineModel = await MagazineModel.create(magazine);
  const savedMagazine = await magazineModel.save();
  return savedMagazine;
}

// add issue to magazine

const magazines = {
  createMagazine,
  findAllMagazinesWith,
};

export default magazines;
