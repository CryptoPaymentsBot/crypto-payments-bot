import fsp from "fs/promises";

import { TokenAdapter } from "../adapters/TokenAdapter.js";
import { logger } from "../logger.js";
import { Token } from "../models/token.js";
import { resizeArray } from "../utils/resizeArray.js";

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
    this._tokens.forEach((token) => logger.log(token.toString()));
    logger.log(`${this._tokens.length} tokens loaded`);
    /**
     * @type {Object.<String, Token>}
     */
    this._tokensMap = this._tokens.reduce((accumulator, token) => {
      accumulator[token.toString()] = token;

      return accumulator;
    }, {});
  }

  static get() {
    return this._tokens;
  }

  static getMap() {
    return this._tokensMap;
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
   * @param {String} text
   * @returns {Token}
   */
  static findByText(text) {
    return this._tokensMap[text];
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
