import { fileURLToPath } from "node:url";
import { dirname, join } from "path";

import { Mongo } from "./repositories/Mongo.js";
import { TokensRepository } from "./repositories/TokensRepository.js";
import { UsersRepository } from "./repositories/UsersRepository.js";

const allTokensPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/tokens.json",
);

export const init = async () => {
  await Mongo.connect();

  process.on("beforeExit", () => Mongo.close());
  await TokensRepository.load(allTokensPath);
  await UsersRepository.load(Mongo.collection("users"));
};
