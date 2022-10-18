import { escapeHTML } from "telegram-escape";

import { Currency } from "./Currency.js";
import { Product } from "./Product.js";
import { ReceiveOptions } from "./ReceiveOptions.js";
import { User } from "./User.js";

/**
 * @typedef Balances
 * @property {number} updatedAt
 */

export class Bot {
  /**
   *
   * @param {Object} params
   * @param {number} [params.id] row id
   * @param {number} params.telegramId bot telegram id
   * @param {string} [params.baseCurrencyCode="USD"] base currency, linked to Currency.code
   * @param {number} params.userId linked to User.id - owner of this bot
   *
   * @param {string} params.name name of Bot
   * @param {string} params.tokenHash SHA256 of bot's token
   * @param {string} params.username t.me/username of bot
   * @param {string} params.apiKeyHash SHA256 of bot's api key
   *
   * @param {Balances} [params.balances] list of maps of native chains addresses
   * @param {import("../wallet/wallet.js").Addresses[]} params.addresses list of maps of native chains addresses
   *
   * @param {User} [params.user]
   * @param {Product[]} [params.products]
   * @param {Currency} [params.currency]
   *
   * @param {boolean} [params.isPremium=false] is bot premium on our platform
   * @param {Date} [params.createdAt=Date()] timestamp in ms of user creation
   * @param {string[]} [params.excludedTokens=[]] list of excluded tokens, linked to Token.symbol
   * @param {import("./ReceiveOptions.js").ReceiveOptionsEnum} [params.receiveOption=DM] default invoice receive payment information method
   * @param {import("./RequestType.js").RequestTypeEnum[]} [params.requestList=[]] default list of data which will be requested before payment
   *
   * @param {string | null} [params.webhookUrl=null]
   *
   */
  constructor({
    id,
    telegramId,
    baseCurrencyCode = "USD",
    userId,
    name,
    tokenHash,
    username,
    apiKeyHash,
    balances,
    addresses,
    user,
    products,
    currency,
    isPremium,
    createdAt = new Date(),
    excludedTokens = [],
    receiveOption = ReceiveOptions.DM,
    requestList = [],
    webhookUrl = null,
  }) {
    /**
     * @type {number | undefined} row id
     */
    this.id = id;
    /**
     * @type {number} bot telegram id
     */
    this.telegramId = telegramId;
    /**
     * @type {string} base currency, linked to Currency.code
     */
    this.baseCurrencyCode = baseCurrencyCode;
    /**
     * @type {number} linked to User.id - owner of this bot
     */
    this.userId = userId;
    /**
     * @type {string} name of Bot
     */
    this.name = name;
    /**
     * @type {string} SHA256 of bot's token
     */
    this.tokenHash = tokenHash;
    /**
     * @type {string} t.me/username of bot
     */
    this.username = username;
    /**
     * @type {string} SHA256 of bot's api key
     */
    this.apiKeyHash = apiKeyHash;
    /**
     * @type {Balances | undefined} list of maps of native chains addresses
     */
    this.balances = balances;
    /**
     * @type {import("../wallet/wallet.js").Addresses[]} list of maps of native chains addresses
     */
    this.addresses = addresses;
    /**
     * @type {User | undefined}
     */
    this.user = user;
    /**
     * @type {Product[] | undefined}
     */
    this.products = products;
    /**
     * @type {Currency | undefined}
     */
    this.currency = currency;
    /**
     * @type {boolean | undefined} is bot premium on our platform
     */
    this.isPremium = isPremium;
    /**
     * @type {Date} timestamp in ms of user creation
     */
    this.createdAt = createdAt;
    /**
     * @type {string[]} list of excluded tokens, linked to Token.symbol
     */
    this.excludedTokens = excludedTokens;
    /**
     * @type {import("./ReceiveOptions.js").ReceiveOptionsEnum} default invoice receive payment information method
     */
    this.receiveOption = receiveOption;
    /**
     * @type {import("./RequestType.js").RequestTypeEnum[]} default list of data which will be requested before payment
     */
    this.requestList = requestList;
    /**
     * @type {string | null}
     */
    this.webhookUrl = webhookUrl;
  }

  get HTML() {
    return `<a href="tg://user?id=${this.id}">${escapeHTML(this.name)}</a>`;
  }
}
