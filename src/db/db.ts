import mongoose from "mongoose";

const startDB = (url: string) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch(() => console.log("DB did not connect"));
};

export default startDB;
