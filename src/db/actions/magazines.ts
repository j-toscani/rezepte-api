import Magazine, { MagazineModel } from "../models/Magazine";
import { Types } from "mongoose";

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

// update a Magazine
export async function updateMagazine(id: string, updates: {}) {
  const UpdatedMagazine = await MagazineModel.findOneAndUpdate(
    { _id: Types.ObjectId(id) },
    { ...updates }
  );

  return UpdatedMagazine;
}

// delete a Magazine
export async function deleteMagazine(id: string) {
  const magazineId = Types.ObjectId(id);
  const deleted = MagazineModel.findByIdAndDelete(magazineId);
  return deleted;
}

const magazines = {
  createMagazine,
  findAllMagazinesWith,
  updateMagazine,
  deleteMagazine,
};

export default magazines;
