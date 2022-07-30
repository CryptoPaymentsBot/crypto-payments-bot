import { EventEmitter } from "node:events";
import { isAsyncFunction } from "node:util/types";

import { ParseMode } from "../../constants.js";
import { getKey, t18g } from "../../locales/t18g.js";
import { logger } from "../../logger.js";
import { User } from "../../models/user.js";
import { bot } from "../bots/bot.js";

/**
 * @typedef StartParams
 * @property {Number} chatId
 * @property {String} locale
 * @property {User} user
 * @property {import('node-telegram-bot-api').Message} message
 * @property {Object} [options]
 *
 */

/**
 * @typedef EventParams
 * @property {Number} id
 * @property {String} locale
 * @property {String} key
 * @property {import('./MenuNode.js').MenuNode} menuNode
 * @property {User} user
 * @property {import('node-telegram-bot-api').Message} message
 * @property {Object} [options]
 *
 */

/**
 * @typedef ErrorPayload
 * @property {string} event
 * @property {Error} err
 * @property {Function} listener
 * @property {EventParams} args
 */
export class Menu extends EventEmitter {
  static Events = Object.freeze({
    ALL: "all",
    OUTHER: "outher",
    ERROR: "error",
  });

  /**
   *
   * @param {String} name menu name
   */
  constructor(name) {
    super();
    this.name = name;
    /**
     * @type {import('./MenuController.js').MenuController | null}
     */
    this.controller = null;
    this.on(Menu.Events.ERROR, this.onError);
  }

  /**
   * @abstract
   * @param {StartParams} params
   * @returns {Promise<boolean>}
   */
  async start(params) {
    throw new Error('Unimplemented method "start"');
  }

  /**
   *
   * @param {import('node-telegram-bot-api').Message} message
   * @param {import('./MenuNode').MenuNode} menuNode
   * @param {User} user
   */
  async handleMessage(message, menuNode, user) {
    const {
      text,
      chat: { id },
    } = message;

    const { locale } = user;

    const localeKey = getKey(locale, text) ?? Menu.Events.OUTHER;

    const key = this.buttons.flat().includes(localeKey)
      ? localeKey
      : Menu.Events.OUTHER;
    const payload = { message, user, menuNode, locale, id, key };

    await this.emitAsync(Menu.Events.ALL, payload);

    await this.emitAsync(key, payload);

    logger.log(
      `[${new Date().toLocaleString()}][#id${id}][#menu][${
        menuNode?.name
      }] ${key}`,
    );
  }

  /**
   * @type {String[][]}
   */
  get buttons() {
    return [[]];
  }

  /**
   * @param {String} locale
   * @returns {import('node-telegram-bot-api').KeyboardButton[][]}
   */
  getKeyboard(locale) {
    return this.buttons.map((buttonsRow) =>
      buttonsRow.map((buttonText) => ({ text: t18g(locale)([buttonText]) })),
    );
  }

  /**
   *
   * @param {string| symbol} event
   * @param {(...args: any[]) => void} listener
   */
  on(event, listener) {
    /**
     *
     * @param  {...any} args
     */
    const catchableListener = async (...args) => {
      try {
        if (isAsyncFunction(listener)) {
          await listener.call(this, ...args);
          return;
        }
        listener.call(this, ...args);
      } catch (err) {
        await this.emitAsync(Menu.Events.ERROR, {
          event,
          listener,
          err,
          args: args?.[0],
        });
      }
    };
    return super.on(event, catchableListener);
  }

  /**
   *
   * @param {string} event
   * @param  {...any} args
   */
  async emitAsync(event, ...args) {
    await Promise.all(
      this.listeners(event).map((listener) => listener.call(this, ...args)),
    );
  }

  /**
   * @param {ErrorPayload} params
   */
  async onError({ err, event, args }) {
    logger.error(`<[Event name: "${event}"]>\n`, args, err, `\n<[/Event]>`);

    const { user } = args ?? {};

    if (!user) return;

    const { id, locale } = user;

    try {
      await bot.sendMessage(id, t18g(locale)`something_went_wrong`, {
        parse_mode: ParseMode.HTML,
      });
    } catch (error) {
      logger.error(
        "<[something_went_wrong]>",
        args,
        error,
        "</[something_went_wrong]>",
      );
    }
  }
}
