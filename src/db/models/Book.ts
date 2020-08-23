import { Schema, model, Document } from "mongoose";
import Recipe from "./Recipe";
import Location from "./Location";

export const DOCUMENT_NAME = "Book";
export const COLLECTION_NAME = "books";

export default interface Book extends Document {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  location: Location;
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
  location: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Location",
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Recipe",
    },
  ],
});

export const BookModel = model<Book>(DOCUMENT_NAME, schema, COLLECTION_NAME);
