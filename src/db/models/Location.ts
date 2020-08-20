import { Schema, model, Document } from "mongoose";
import Issue from "./Issue";
import Book from "./Book";

export const DOCUMENT_NAME = "Location";
export const COLLECTION_NAME = "locationss";

export default interface Location extends Document {
  name: string;
  description: string;
  source: (Book | Issue)[];
}

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    maxlength: 250,
  },
  description: {
    type: Schema.Types.String,
    required: true,
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
    enum: ["Book", "Issue"],
  },
});

export const LocationModel = model<Location>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
