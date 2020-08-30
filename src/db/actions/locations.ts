import Location, { LocationModel } from "../models/Location";

// create a new location
export async function createLocation(location: Location) {
  const now = new Date();
  location.createdAt = now;
  location.updatedAt = now;
  const locationModel = await LocationModel.create(location);
  const savedLocation = await locationModel.save();
  return savedLocation;
}

// find all locations
export async function findAllLocationsWith(options: {} = {}) {
  const locationModels = await LocationModel.find(options);
  if (locationModels.length < 1) return null;
  const populatedLocations = locationModels.map((locationModel) =>
    locationModel.execPopulate()
  );
  const locations = await Promise.all(populatedLocations);
  return locations;
}
// erase an old location

// rename an existing location

// add a source to a location

const locations = {
  createLocation,
  findAllLocationsWith,
};

export default locations;
