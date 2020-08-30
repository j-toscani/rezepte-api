import { Schema, model, Document } from "mongoose";
import Recipe from "./Recipe";
import Location from "./Location";
import Magazine from "./Magazine";

export const DOCUMENT_NAME = "Issue";
export const COLLECTION_NAME = "issues";

export default interface Issue extends Document {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  season: number;
  year: number;
  location: Location;
  magazine: Magazine;
  recipes: Recipe[];
}

const schema = new Schema({
  createdAt: {
    type: Schema.Types.Date,
    required: true,
  },
  updatedAt: {
    type: Schema.Types.Date,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    maxlength: 250,
  },
  season: {
    type: Schema.Types.Number,
    required: true,
  },
  year: {
    type: Schema.Types.Number,
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Location",
  },
  magazine: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Magazine",
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Recipe",
    },
  ],
});

export const IssueModel = model<Issue>(DOCUMENT_NAME, schema, COLLECTION_NAME);
