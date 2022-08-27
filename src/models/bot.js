import { escapeHTML } from "telegram-escape";

/**
 * @typedef RequestOption
 * @property {"contract"| "location" | "comment"} type
 * @property {string} comment
 */

export class Bot {
  /**
   *
   * @param {Object} params
   * @param {*} [params._id]  objectid of mongodb
   * @param {Number} params.id bot telegram id
   * @param {Number} params.ownerId linked to User.id - owner of this bot
   * @param {string} params.name name of Bot
   * @param {string} params.username t.me/username of bot
   * @param {string} params.apiKey bot's api key
   * @param {import("../wallet/wallet.js").Addresses[]} params.addresses list of maps of native chains addresses
   * @param {string[]} [params.exludedTokens=[]] list of excluded tokens, linked to Token.symbol
   * @param {string} [params.baseCurrency="USD"] base currenc, linked to Currency.code
   * @param {Number} [params.createdAt=Date.now()] timestamp in ms of user creation
   * @param {"DM" | "webhook"} [params.receiveOption=DM] default invoice receive payment information method
   * @param {RequestOption[]} [params.requestList=[]] default list of data which will be requested before payment
   * @param {string|null} [params.webhookUrl=null]
   *
   */
  constructor({
    _id,
    id,
    ownerId,
    name,
    username,
    apiKey,
    addresses,
    exludedTokens = [],
    baseCurrency = "USD",
    createdAt = Date.now(),
    receiveOption = "DM",
    requestList = [],
    webhookUrl = null,
  }) {
    /**
     * @type {*} objectid of mongodb
     */
    this._id = _id;
    /**
     * @type {number} bot telegram id
     */
    this.id = id;
    /**
     * @type {number} linked to User.id - owner of this bot
     */
    this.ownerId = ownerId;
    /**
     * @type {string} name of Bot
     */
    this.name = name;
    /**
     * @type {string} t.me/username of bot
     */
    this.username = username;
    /**
     * @type {string} bot's api key
     */
    this.apiKey = apiKey;
    /**
     * @type {import("../wallet/wallet.js").Addresses[]} list of accounts of map of native chains addresses
     */
    this.addresses = addresses;
    /**
     * @type {string[]} list of excluded tokens, linked to Token.symbol
     */
    this.exludedTokens = exludedTokens;
    /**
     * @type {string}  base currenc, linked to Currency.code
     */
    this.baseCurrency = baseCurrency;
    /**
     * @type {number}  timestamp in ms of user creation
     */
    this.createdAt = createdAt;
    /**
     * @type {"DM" | "webhook"}  default invoice receive payment information method
     */
    this.receiveOption = receiveOption;
    /**
     * @type {RequestOption[]}  default list of data which will be requested before payment
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
