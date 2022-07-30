import { logger } from "../../logger.js";
import { User } from "../../models/user.js";
import { Callback } from "./Callback.js";

/**
 * @typedef CallbackPayload
 * @property {import("node-telegram-bot-api").CallbackQuery} callbackQuery
 * @property {User} user
 */

export class CallbackController {
  /**
   *
   * @param {(typeof Callback)[]} callbacks
   */
  constructor(callbacks) {
    this.callbacks = callbacks;
  }

  /**
   *
   * @param {*} data
   */
  testData(data) {
    return this.callbacks.find((Callback) => Callback.testData(data));
  }

  /**
   * @param {CallbackPayload} payload
   *
   *
   * @returns {Promise<import('./Callback.js').CallbackMethodResult>}
   */
  async handleCallbackQuery(payload) {
    const { user, callbackQuery } = payload;
    const argument = callbackQuery.data;

    const Callback = this.testData(argument);

    if (!Callback) return {};

    logger.log(
      `[CallbackController][#id${user.id}] calls callback "${Callback.name}" "${argument}"`,
    );

    return Callback.method(payload);
  }
}
