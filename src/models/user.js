import { escapeHTML } from "telegram-escape";

import { Model } from "./model.js";

/**
 * @type {import("./model.js").ValidationRule[]}
 */
const userValidation = [
  {
    name: "id",
    type: "number",
    required: true,
  },
  {
    name: "name",
    type: "string",
    required: true,
  },
  {
    name: "locale",
    type: "string",
    required: true,
  },
];

export class User extends Model {
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
    updatedAt,

    id,
    name,
    locale,
    startTag,
    temporaryMessage,
  }) {
    super({ _id, createdAt, updatedAt });
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

    this.validate(userValidation);

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
