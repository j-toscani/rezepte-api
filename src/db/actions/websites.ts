import Website, { WebsiteModel } from "../models/Website";

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

// add recipe to website

// change location of website

// get all recipes from all websites

// get all recipes from one website

const websites = {
  createWebsite,
  findAllWebsitesWith,
};

export default websites;
