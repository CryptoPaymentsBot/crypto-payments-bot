import { fetch } from "undici";

import { config } from "../config.js";
import { logger } from "../logger.js";
import { CurrenciesRepository } from "../repositories/CurrenciesRepository.js";
import { TokensRepository } from "../repositories/TokensRepository.js";
import { BaseTask } from "./base.js";

const COINGECKO_ENDPOINT = config(
  "COINGECKO_ENDPOINT",
  "https://api.coingecko.com/api/v3/simple/price",
);

export class PriceTask extends BaseTask {
  async run() {
    const allCurrencies = CurrenciesRepository.getCodes();
    const allCoingeckoIds = TokensRepository.getExternalIds("coingecko");
    const endpoint = `${COINGECKO_ENDPOINT}?ids=${allCoingeckoIds.join(
      ",",
    )}&vs_currencies=${allCurrencies.join(",")}`;

    const response = await fetch(endpoint);
    const prices = await response.json();

    logger.log(prices);
  }
}
