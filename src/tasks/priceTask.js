import { fetch } from "undici";

import { config } from "../config.js";
import { logger } from "../logger.js";
import { Price } from "../models/price.js";
import { CurrenciesRepository } from "../repositories/CurrenciesRepository.js";
import { PricesRepository } from "../repositories/PricesRepository.js";
import { TokensRepository } from "../repositories/TokensRepository.js";
import { BaseTask } from "./base.js";

const COINGECKO_ENDPOINT = config(
  "COINGECKO_ENDPOINT",
  "https://api.coingecko.com/api/v3/simple/price",
);

/**
 * @typedef {Record<string, Record<string, number>>} CoingeckoPricing
 */

export class PriceTask extends BaseTask {
  async run() {
    const allCurrencies = CurrenciesRepository.getCodes();
    const allCoingeckoIds = TokensRepository.getExternalIds("coingecko");
    const endpoint = `${COINGECKO_ENDPOINT}?ids=${allCoingeckoIds.join(
      ",",
    )}&vs_currencies=${allCurrencies.join(",")}`;

    const response = await fetch(endpoint);
    /**
     * @type {CoingeckoPricing}
     */
    // @ts-ignore
    const pricesResponse = await response.json();

    const prices = Object.entries(pricesResponse).flatMap(
      ([externalId, fiat]) =>
        Object.entries(fiat).map(
          ([currencyCode, amount]) =>
            new Price({
              currencyCode,
              tokenSymbol: TokensRepository.getSymbolByExternalId(
                "coingecko",
                externalId,
              ),
              amount,
            }),
        ),
    );
    await PricesRepository.setPrices(prices);

    logger.log(`[PriceTask] ${prices.length} prices updated at ${new Date()}`);
  }
}
