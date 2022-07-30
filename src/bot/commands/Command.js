/**
 * @typedef {Object} Payload
 * @property {Number} chatId
 * @property {String} argument
 * @property {String} locale
 * @property {User} user
 * @property {import('node-telegram-bot-api').Message} message
 */

import { ChatType } from "../../constants.js";
import { User } from "../../models/user.js";

/**
 * @abstract
 */
export class Command {
  /**
   * @abstract
   *
   * @returns {import('node-telegram-bot-api').ChatAction}
   */
  get action() {
    throw new Error("Abstract property");
  }

  /**
   * @abstract
   * @returns {Boolean}
   */
  get admin() {
    return false;
  }

  /**
   * @type {import('node-telegram-bot-api').ChatType[]}
   */
  get types() {
    return [ChatType.private];
  }

  /**
   * @abstract
   *
   * @param {Payload} _payload
   *
   * @returns {Promise<Object>}
   */
  async method(_payload) {
    throw new Error("Abstract method");
  }
}
