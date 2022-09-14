import { escapeHTML } from "telegram-escape";
// TODO: Add locale support
export class Product {
  /**
   *
   * @param {Object} params
   * @param {*} [params._id] mongodb id
   * @param {string} params.name Name of the product
   * @param {Number} params.botId id of bot
   * @param {Number} params.createdAt date of product creation
   * @param {string} params.defaultPrice default price of this product in defaultFiat
   * @param {string} params.defaultFiat defaultFiat linked to Currency.code
   * @param {string} [params.description] Descripton of product
   * @param {string} [params.externalLink] Additional external link to third-party web site
   * @param {string} [params.photoId] photo of the product, linked to telegram photo id
   * @param {string} [params.videoId] video of the product, linked to telegram video id
   */
  constructor({
    _id,
    name,
    botId,
    createdAt,
    defaultFiat,
    defaultPrice,
    description,
    externalLink,
    photoId,
    videoId,
  }) {
    /**
     * @type {*} mongodb id
     */
    this._id = _id;
    /**
     * @type {string} Name of the product
     */
    this.name = name;
    /**
     * @type {Number} id of bot
     */
    this.botId = botId;
    /**
     * @type {Number} date of product creation
     */
    this.createdAt = createdAt;
    /**
     * @type {string} default price of this product in defaultFiat
     */
    this.defaultPrice = defaultPrice;
    /**
     * @type {string} defaultFiat linked to Currency.code
     */
    this.defaultFiat = defaultFiat;
    /**
     * @type {string | undefined}  Descripton of product
     */
    this.description = description;
    /**
     * @type {string | undefined}  Additional external link to third-party web site
     */
    this.externalLink = externalLink;
    /**
     * @type {string | undefined}  photo of the product, linked to telegram photo id
     */
    this.photoId = photoId;
    /**
     * @type {string | undefined} [params.videoId] video of the product, linked to telegram video id
     */
    this.videoId = videoId;
  }
}
