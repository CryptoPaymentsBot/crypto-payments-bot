import { ChatAction, ChatType } from "../../constants.js";
import { User } from "../../models/user.js";
import { menuController } from "../menus/controller.js";
import { MenuNames } from "../menus/names.js";
import { prefixController } from "../prefixes/controller.js";
import { Command } from "./Command.js";

export class StartCommand extends Command {
  constructor() {
    super();
  }

  /**
   * @returns {import('node-telegram-bot-api').ChatAction}
   */
  get action() {
    return ChatAction.typing;
  }

  get types() {
    return [ChatType.private];
  }

  /**
   *
   * @param {User} user
   * @param {string} argument
   *
   * @returns {boolean} true if it's a first start
   */
  processStartTag(user, argument) {
    if (user.startTag === undefined) {
      user.startTag = argument;
      return true;
    }
    return false;
  }

  /**
   * @param {import('./Command').Payload} payload
   */
  async method(payload) {
    const { chatId, locale, message, user, argument } = payload;

    /**
     * @type {*}
     */
    const options = await prefixController.handleStart(payload);

    const isFirstStart = this.processStartTag(user, argument);

    if (isFirstStart) options.isFirstStart = true;

    if (!options.continue) return;

    return menuController.startMenu({
      locale,
      message,
      user,
      options,
      id: chatId,
      menuName: options.menuToStart ?? MenuNames.MAIN,
    });
  }
}
