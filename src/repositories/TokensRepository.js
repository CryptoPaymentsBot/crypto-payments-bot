import fsp from "fs/promises";

import { TokenAdapter } from "../adapters/TokenAdapter.js";
import { logger } from "../logger.js";
import { Token } from "../models/Token.js";
import { resizeArray } from "../utils/resizeArray.js";
import { prismaClient } from "./PrismaClient.js";

export class TokensRepository {
  static ColumnsCount = 3;
  /**
   * @type {Token[]}
   */
  static _tokens = [];

  /**
   *
   * @param {String} tokensFile path to languages path
   */
  static async load(tokensFile) {
    const src = await fsp.readFile(tokensFile, "utf-8");
    /**
     * @type {Array}
     */
    const json = JSON.parse(src);

    if (!Array.isArray(json)) throw new Error(`${tokensFile} is not array`);

    this._tokens = json.map((obj) => new Token(obj));

    logger.log(`[TokensRepository] ${this._tokens.length} tokens loaded`);
    /**
     * @type {Record<string, Record<string, string>>}
     */
    this._tokensMap = this._tokens.reduce((accumulator, token) => {
      Object.entries(token.externalIds).forEach(([source, externalId]) => {
        if (!accumulator[source]) accumulator[source] = {};
        accumulator[source][externalId] = token.symbol;
      });

      return accumulator;
    }, {});

    await Promise.all(
      this._tokens.map(async (token) => {
        const row = await prismaClient.token.findFirst({
          where: {
            name: token.name,
            nativeChain: token.nativeChain,
            symbol: token.symbol,
          },
        });
        if (row) return;
        await prismaClient.token.create({ data: token });
      }),
    );
  }

  static get() {
    return this._tokens;
  }

  /**
   * @param {string} source
   */
  static getExternalIds(source) {
    return [...new Set(this._tokens.map((token) => token.externalIds[source]))];
  }

  /**
   *
   * @param {String[]} exclude array of symbols codes
   * @returns {import('node-telegram-bot-api').KeyboardButton[][]}
   */
  static getKeyboard(exclude = []) {
    return resizeArray(
      this._tokens.filter((token) => !exclude.includes(token.symbol)),
      TokensRepository.ColumnsCount,
      (language) => new TokenAdapter(language),
    );
  }

  /**
   *
   * @param {String} source
   * @param {String} externalId
   * @returns {string}
   */
  static getSymbolByExternalId(source, externalId) {
    if (!this._tokensMap) throw new Error("TokensRepository is not loaded");
    return this._tokensMap[source][externalId];
  }

  /**
   *
   * @param {String} symbolToFind
   * @returns
   */
  static findBySymbol(symbolToFind) {
    return this._tokens.find(({ symbol }) => symbol === symbolToFind);
  }
}
