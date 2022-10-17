import { escapeHTML } from "telegram-escape";

import { Bot } from "./Bot.js";
import { Invoice } from "./Invoice.js";

export class User {
  /**
   *
   * @param {Object} params
   * @param {number} [params.id] row id
   * @param {number} params.telegramId user telegram id
   * @param {string} params.name user full name
   * @param {string} params.locale user language locale
   * @param {string | null | undefined} [params.startTag=null] argument of first /start argument command
   * @param {Date} [params.createdAt=Date] timestamp in ms of user creation
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
    createdAt = new Date(),
    bots = [],
    invoices = [],
  }) {
    /**
     * @type {number | undefined}  row id
     */
    this.id = id;
    /**
     * @type  {number}  user telegram id
     */
    this.telegramId = telegramId;
    /**
     * @type {string} params.name user full name
     */
    this.name = name;
    /**
     * @type {string} params.locale user language locale
     */
    this.locale = locale;
    /**
     * @type {string | null | undefined} [params.startTag=null] argument of first /start argument command
     */
    this.startTag = startTag;
    /**
     * @type {Date} [params.createdAt=Date] timestamp in ms of user creation
     */
    this.createdAt = createdAt;
    /**
     * @type  {Bot[]} [params.bots=[]] owned bots of this user
     */
    this.bots = bots;
    /**
     * @type  {Invoice[]} [params.invoices=[]] invoices of this user
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
