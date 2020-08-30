import { Schema, model, Document } from "mongoose";
import Recipe from "./Recipe";

export const DOCUMENT_NAME = "Website";
export const COLLECTION_NAME = "websites";

export default interface Website extends Document {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  issue?: string;
  location: string;
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

export const WebsiteModel = model<Website>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
