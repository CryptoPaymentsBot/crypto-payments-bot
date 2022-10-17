import { escapeHTML } from "telegram-escape";

export class Invoice {
  /**
   *
   * @param {Object} params
   * @param {*} [params._id]
   * @param {Number} [params.createdAt]
   * @param {Number} [params.updatedAt]
   * @param {Number} params.id
   * @param {String} params.name
   * @param {String} params.locale
   * @param {String | null} [params.startTag]
   * @param {*} [params.temporaryMessage]
   */
  constructor({
    _id,
    createdAt,
    id,
    name,
    locale,
    startTag,
    temporaryMessage,
  }) {
    /**
     * @type {Number}
     */
    this.id = id;
    /**
     * @type {String}
     */
    this.name = name;
    /**
     * @type {String}
     */
    this.locale = locale;

    /**
     * @type {String | null}
     */
    this.startTag = startTag ?? null;

    this.temporaryMessage = temporaryMessage ?? null;

    this.createdAt = createdAt ?? Date.now();

    this._tracking = true;
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
