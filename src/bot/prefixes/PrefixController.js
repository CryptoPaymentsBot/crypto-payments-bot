import { logger } from "../../logger.js";
import { MenuNames } from "../menus/names.js";
import { Prefix } from "./Prefix.js";

export class PrefixController {
  /**
   *
   * @param {(typeof Prefix)[]} prefixes
   */
  constructor(prefixes) {
    this.prefixes = prefixes;
  }

  /**
   *
   * @param {*} startTag
   */
  testTag(startTag) {
    return this.prefixes.find((Prefix) => Prefix.testTag(startTag));
  }

  /**
   * @param {import('../commands/Command').Payload} payload
   *
   *
   * @returns {Promise<import('./Prefix').PrefixMethodResult>}
   */
  async handleStart(payload) {
    const { argument, chatId } = payload;

    const Prefix = this.testTag(argument);

    if (!Prefix) return { continue: true, menuToStart: MenuNames.MAIN };

    logger.log(
      `[PrefixController][#id${chatId}] starts with prefix-"${Prefix.name}" "${argument}"`,
    );

    return Prefix.method(payload);
  }
}
