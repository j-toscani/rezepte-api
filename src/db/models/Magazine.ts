import { Schema, model, Document } from "mongoose";
import Issue from "./Issue";

export const DOCUMENT_NAME = "Magazine";
export const COLLECTION_NAME = "magazines";

export default interface Magazine extends Document {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  circulation: number;
  issues: Issue;
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
  circulation: {
    type: Schema.Types.Number,
    required: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Issue",
    },
  ],
});

export const MagazineModel = model<Magazine>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
