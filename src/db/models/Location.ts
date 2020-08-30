import { Schema, model, Document } from "mongoose";
import Issue from "./Issue";
import Book from "./Book";

export const DOCUMENT_NAME = "Location";
export const COLLECTION_NAME = "locations";

export default interface Location extends Document {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  source: (Book | Issue)[];
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
  description: {
    type: Schema.Types.String,
    required: true,
  },
  source: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      refPath: "onModel",
    },
  ],
  onModel: {
    type: String,
    required: false,
    enum: ["Book", "Issue"],
  },
});

export const LocationModel = model<Location>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
