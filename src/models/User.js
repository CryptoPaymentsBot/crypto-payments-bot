import { escapeHTML } from "telegram-escape";

import { Bot } from "./Bot.js";
import { Invoice } from "./Invoice.js";
import { Model } from "./Model.js";

export class User extends Model {
  _relations = ["bots", "invoices"];

  /**
   *
   * @param {Object} params
   * @param {number} [params.id] row id
   * @param {number} params.telegramId user telegram id
   * @param {string} params.name user full name
   * @param {string} params.locale user language locale
   * @param {string | null | undefined} [params.startTag=null] argument of first /start argument command
   * @param {Date | null} [params.createdAt=Date] Date when user was created in db
   * @param {boolean | null} [params.isConfirmed=false] was user data confirmed on bot side
   *
   * @param {Bot[]} [params.bots=[]] owned bots of this user
   * @param {Invoice[]} [params.invoices=[]] invoices of this user
   */
  constructor({
    id,
    telegramId,
    name,
    locale,
    startTag,
    createdAt,
    isConfirmed = false,
    bots = [],
    invoices = [],
  }) {
    super();
    /**
     * @type {number | undefined}  row id
     */
    this.id = id;
    /**
     * @type  {number}  user telegram id
     */
    this.telegramId = telegramId;
    /**
     * @type {string} user full name
     */
    this.name = name;
    /**
     * @type {string} user language locale
     */
    this.locale = locale;
    /**
     * @type {string | null | undefined} argument of first /start argument command
     */
    this.startTag = startTag;
    /**
     * @type {Date} timestamp in ms of user creation
     */
    this.createdAt = createdAt ?? new Date();
    /**
     * @type {boolean} was user data confirmed on bot side
     */
    this.isConfirmed = Boolean(isConfirmed);
    /**
     * @type  {Bot[]} owned bots of this user
     */
    this.bots = bots;
    /**
     * @type  {Invoice[]} invoices of this user
     */
    this.invoices = invoices;
  }

  get HTML() {
    return `<a href="tg://user?id=${this.telegramId}">${escapeHTML(
      this.name,
    )}</a>`;
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
