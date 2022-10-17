import { fileURLToPath } from "node:url";
import { dirname, join } from "path";

import { CurrenciesRepository } from "./repositories/CurrenciesRepository.js";
import { PricesRepository } from "./repositories/PricesRepository.js";
import { redisClient } from "./repositories/Redis.js";
import { TokensRepository } from "./repositories/TokensRepository.js";
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
  await TokensRepository.load(allTokensPath);
  await CurrenciesRepository.load(allCurrenciesPath);
  await PricesRepository.load(redisClient);

  await initTasks();
};
