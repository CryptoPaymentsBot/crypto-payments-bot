import { Mongo } from "./repositories/Mongo.js";
import { UsersRepository } from "./repositories/UsersRepository.js";

export const init = async () => {
  await Mongo.connect();

  process.on("beforeExit", () => Mongo.close());

  await UsersRepository.load(Mongo.collection("users"));
};
