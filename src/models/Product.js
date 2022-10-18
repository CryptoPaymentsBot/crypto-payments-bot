import { Bot } from "./Bot.js";
import { Currency } from "./Currency.js";
import { Invoice } from "./Invoice.js";

// TODO: Add locale support
export class Product {
  /**
   * @param {Object} params
   * @param {number} [params.id] row id
   * @param {number} params.botId id of bot
   * @param {string} params.defaultCurrencyCode linked to Currency.code
   *
   * @param {string} params.name Name of the product
   * @param {string} params.defaultPrice default price of this product in defaultFiat
   *
   * @param {Bot} [params.bot]
   * @param {Currency} [params.currency]
   * @param {Invoice[]} [params.invoices]
   *
   * @param {Date} [params.createdAt] date of product creation
   *
   * @param {string} [params.description] Description of product
   * @param {string} [params.externalLink] Additional external link to third-party web site
   * @param {string} [params.photoId] photo of the product, linked to telegram photo id
   * @param {string} [params.videoId] video of the product, linked to telegram video id
   */
  constructor({
    id,
    botId,
    defaultCurrencyCode,

    name,
    defaultPrice,
    bot,
    currency,
    invoices,

    createdAt = new Date(),

    description,
    externalLink,
    photoId,
    videoId,
  }) {
    /**
     * @type {number | undefined} row id
     */
    this.id = id;
    /**
     * @type {number} id of bot
     */
    this.botId = botId;
    /**
     * @type {string} linked to Currency.code
     */
    this.defaultCurrencyCode = defaultCurrencyCode;
    /**
     * @type {string} Name of the product
     */
    this.name = name;
    /**
     * @type {string} default price of this product in defaultFiat
     */
    this.defaultPrice = defaultPrice;
    /**
     * @type {Bot | undefined}
     */
    this.bot = bot;
    /**
     * @type {Currency | undefined}
     */
    this.currency = currency;
    /**
     * @type {Invoice[] | undefined}
     */
    this.invoices = invoices;
    /**
     * @type {Date} date of product creation
     */
    this.createdAt = createdAt;
    /**
     * @type {string | undefined} Description of product
     */
    this.description = description;
    /**
     * @type {string | undefined} Additional external link to third-party web site
     */
    this.externalLink = externalLink;
    /**
     * @type {string | undefined} photo of the product, linked to telegram photo id
     */
    this.photoId = photoId;
    /**
     * @type {string | undefined} video of the product, linked to telegram video id
     */
    this.videoId = videoId;
  }
}
