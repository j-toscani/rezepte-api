import mongoose from "mongoose";

const url = process.env.DB_URL || "mongodb://localhost:27017/test";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
