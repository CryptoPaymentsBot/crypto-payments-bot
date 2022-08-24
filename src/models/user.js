import { escapeHTML } from "telegram-escape";

export class User {
  /**
   *
   * @param {Object} params
   * @param {*} [params._id] objectid of mongodb
   * @param {Number} params.id user telegram id
   * @param {String} params.name user full name
   * @param {String} params.locale user language locale
   * @param {String | null} [params.startTag] argument of first /start argument command
   * @param {boolean} [params.isPremium] is telegram premium account
   * @param {Number} [params.createdAt] timestamp in ms of user creation
   */
  constructor({ _id, createdAt, id, name, locale, startTag, isPremium }) {
    /**
     * @type {*} objectid of mongodb
     */
    this._id = _id;
    /**
     * @type {Number} user telegram id
     */
    this.id = id;
    /**
     * @type {String} user full name
     */
    this.name = name;
    /**
     * @type {String} user language locale
     */
    this.locale = locale;

    /**
     * @type {String | null} argument of first /start argument command
     */
    this.startTag = startTag ?? null;

    /**
     * @type {boolean} is telegram premium account
     */
    this.isPremium = isPremium ?? false;
    /**
     * @type {number} timestamp in ms of user creation
     */
    this.createdAt = createdAt ?? Date.now();
  }

  get HTML() {
    return `<a href="tg://user?id=${this.id}">${escapeHTML(this.name)}</a>`;
  }

  /**
   *
   * @param {String} newLocale
   */
  changeLocale(newLocale) {
    if (typeof newLocale !== "string") {
      throw new Error('"newLocale" should be a string');
    }

    this.locale = newLocale;
  }
}
