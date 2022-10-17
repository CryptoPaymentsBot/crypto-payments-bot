import fsp from "fs/promises";

import { CurrencyAdapter } from "../adapters/CurrencyAdapter.js";
import { logger } from "../logger.js";
import { Currency } from "../models/Currency.js";
import { resizeArray } from "../utils/resizeArray.js";
import { prismaClient } from "./PrismaClient.js";

export class CurrenciesRepository {
  static ColumnsCount = 3;
  /**
   * @type {Currency[]}
   */
  static _currencies = [];
  /**
   * @type {string[]}
   */
  static _codes = [];

  /**
   *
   * @param {String} currenciesFile path to languages path
   */
  static async load(currenciesFile) {
    const src = await fsp.readFile(currenciesFile, "utf-8");
    /**
     * @type {Array}
     */
    const json = JSON.parse(src);

    if (!Array.isArray(json)) throw new Error(`${currenciesFile} is not array`);

    this._currencies = json.map((obj) => new Currency(obj));

    logger.log(
      `[CurrenciesRepository]  ${this._currencies.length} currencies loaded`,
    );
    /**
     * @type {Object.<String, Currency>}
     */
    this._currenciesMap = this._currencies.reduce((accumulator, currency) => {
      accumulator[currency.toString()] = currency;
      this._codes.push(currency.code.toLowerCase());

      return accumulator;
    }, {});

    await Promise.all(
      this._currencies.map(async (currency) => {
        const row = await prismaClient.currency.findFirst({
          where: {
            name: currency.name,
            code: currency.code,
            symbol: currency.symbol,
          },
        });
        if (row) return;
        await prismaClient.currency.create({ data: currency });
      }),
    );
  }

  static get() {
    return this._currencies;
  }

  static getCodes() {
    return this._codes;
  }

  static getMap() {
    return this._currenciesMap;
  }

  /**
   *
   * @param {String[]} exclude array of symbols codes
   * @returns {import('node-telegram-bot-api').KeyboardButton[][]}
   */
  static getKeyboard(exclude = []) {
    return resizeArray(
      this._currencies.filter((currency) => !exclude.includes(currency.symbol)),
      CurrenciesRepository.ColumnsCount,
      (language) => new CurrencyAdapter(language),
    );
  }

  /**
   *
   * @param {String} text
   * @returns {Currency}
   */
  static findByText(text) {
    return this._currenciesMap[text];
  }

  /**
   *
   * @param {String} symbolToFind
   * @returns
   */
  static findBySymbol(symbolToFind) {
    return this._currencies.find(({ symbol }) => symbol === symbolToFind);
  }
}
