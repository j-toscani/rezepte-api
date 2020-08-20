import { Schema, model, Document } from "mongoose";
import Recipe from "./Recipe";

export const DOCUMENT_NAME = "Source";
export const COLLECTION_NAME = "sources";

export default interface Source extends Document {
  name: string;
  issue?: string;
  location: string;
  recipes: Recipe[];
}

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    maxlength: 250,
  },
  issue: {
    type: Schema.Types.String,
    required: true,
  },
  recipes: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Recipe",
  },
});

export const SourceModel = model<Source>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
