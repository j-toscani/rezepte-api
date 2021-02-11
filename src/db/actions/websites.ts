import Website, { WebsiteModel } from "../models/Website";
import { Types } from "mongoose";
import checkMongooseId from "../../lib/checkMongooseId";

// create new website entry
export async function createWebsite(website: Website) {
  const now = new Date();
  website.createdAt = now;
  website.updatedAt = now;

  const websiteModel = await WebsiteModel.create(website);
  const savedWebsite = await websiteModel.save();
  return savedWebsite;
}

// get all websites
export async function findAllWebsitesWith(options: {} = {}) {
  const websiteModel = await WebsiteModel.find(options);
  if (websiteModel.length < 1) return null;
  const populatedWebsites = websiteModel.map((webiteModel) =>
    webiteModel.execPopulate()
  );
  const websites = await Promise.all(populatedWebsites);
  return websites;
}

// get one website
export async function findWebsite(id: string) {
  const mongooseId = Types.ObjectId(id);
  const website = await WebsiteModel.findById(mongooseId);
  return website;
}

// update a website
export async function updateWebsite(id: string, updates: {}) {
  if (!checkMongooseId(id)) throw "Not a valid ID";
  const website = await WebsiteModel.findOneAndUpdate(
    { _id: Types.ObjectId(id) },
    { ...updates }
  );

  return website;
}

// delete a website
export async function deleteWebsite(id: string) {
  const websiteId = Types.ObjectId(id);
  const deleted = WebsiteModel.findByIdAndDelete(websiteId);
  return deleted;
}

// get all recipes from all websites

// get all recipes from one website

const websites = {
  createWebsite,
  findAllWebsitesWith,
  updateWebsite,
  findWebsite,
  deleteWebsite,
};

export default websites;
