import IORedis from "ioredis";

import { logger } from "../logger.js";
import { Currency } from "../models/currency.js";
import { Price } from "../models/price.js";
import { Token } from "../models/token.js";

export class PricesRepository {
  /**
   * @type {IORedis | null}
   */
  static redisClient = null;

  /**
   *
   * @param {IORedis} redisClient
   */
  static async load(redisClient) {
    this.redisClient = redisClient;
  }

  /**
   * @param {Price[]} prices
   */
  static async setPrices(prices) {
    if (!this.redisClient) throw new Error("PricesRepository is not loaded");
    const pipeline = this.redisClient.pipeline();
    prices.forEach((price) => {
      pipeline.hset(
        this.generateKey(price.tokenSymbol),
        price.currencyCode,
        `${price.amount}`,
      );
    });
    await pipeline.exec();
  }

  /**
   *
   * @param {Token} token
   * @param {Currency} currency
   */
  static async getPrice({ symbol }, { code }) {
    if (!this.redisClient) throw new Error("PricesRepository is not loaded");

    const price = await this.redisClient.hget(this.generateKey(symbol), code);
    if (!price) return null;

    const amount = parseFloat(price);
    if (Number.isNaN(amount)) return null;

    return new Price({ currencyCode: code, tokenSymbol: symbol, amount });
  }

  /**
   * @param {string} tokenSymbol
   * @returns
   */
  static generateKey(tokenSymbol) {
    return `prices:${tokenSymbol}`;
  }
}
