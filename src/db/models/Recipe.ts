import { Schema, model, Document, Types } from "mongoose";
import Issue from "./Issue";
import Book from "./Book";
import Website from "./Website";

export const DOCUMENT_NAME = "Recipe";
export const COLLECTION_NAME = "recipes";

export default interface Recipe extends Document {
  name: string;
  page: string;
  url: string;
  source: Issue | Book | Website;
  onModel: string;
  notes: string;
  tags: string[];
}

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    maxlength: 200,
  },
  source: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
  ],
  onModel: {
    type: String,
    required: true,
    enum: ["Book", "Issue", "Website"],
  },
  page: {
    type: Schema.Types.String,
    maxlength: 500,
  },
  url: {
    type: Schema.Types.String,
    maxlength: 500,
  },
  notes: {
    type: Schema.Types.String,
    maxlength: 500,
  },
  tags: {
    type: Schema.Types.Array,
    required: true,
  },
});

export const RecipeModel = model<Recipe>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
