import Location, { LocationModel } from "../models/Location";
import { Types } from "mongoose";

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
export async function deleteLocation(id: string) {
  const locationId = Types.ObjectId(id);
  const deleted = LocationModel.findByIdAndDelete(locationId);
  return deleted;
}

// update an existing location
export async function updateLocation(id: string, updates: {}) {
  const updatedLocation = await LocationModel.findOneAndUpdate(
    { _id: Types.ObjectId(id) },
    { ...updates }
  );

  return updatedLocation;
}

const locations = {
  createLocation,
  findAllLocationsWith,
  updateLocation,
  deleteLocation,
};

export default locations;
