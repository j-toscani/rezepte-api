import User, { UserModel } from "../models/User";
import { hash } from "../../core/HashPW";

export async function createUser(user: { name: string; password: string }) {
  const now = new Date();

  user.password = await hash(user.password);

  const dbUser = {
    ...user,
    createdAt: now,
    updatedAt: now,
  };

  const userModel = await UserModel.create(dbUser);
  const savedUser = await userModel.save();
  return savedUser;
}

export async function findUser(user: { name: string; password: string }) {
  return await UserModel.findOne({ name: user.name });
}
