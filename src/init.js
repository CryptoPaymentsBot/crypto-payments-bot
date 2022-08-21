import { fileURLToPath } from "node:url";
import { dirname, join } from "path";

import { CurrenciesRepository } from "./repositories/CurrenciesRepository.js";
import { Mongo } from "./repositories/Mongo.js";
import { TokensRepository } from "./repositories/TokensRepository.js";
import { UsersRepository } from "./repositories/UsersRepository.js";
import { initTasks } from "./tasks/tasks.js";

const allTokensPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/tokens.json",
);
const allCurrenciesPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/currencies.json",
);
export const init = async () => {
  await Mongo.connect();

  process.on("beforeExit", () => Mongo.close());
  await TokensRepository.load(allTokensPath);
  await CurrenciesRepository.load(allCurrenciesPath);
  await UsersRepository.load(Mongo.collection("users"));

  await initTasks();
};
