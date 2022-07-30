import { DEFAULT_LOCALE } from "../../../locales/t18g.js";
import { logger } from "../../../logger.js";
import { UsersRepository } from "../../../repositories/UsersRepository.js";
import { commandParser } from "../../../utils/commandParser.js";
import { commandExecuter } from "../../commands/executer.js";
import { menuController } from "../../menus/controller.js";

/**
 *  @param {import('bull').Job<import("node-telegram-bot-api").Message>}  job
 */
export const messageJobProcessor = async ({ data: message }) => {
  try {
    const {
      id,
      first_name,
      last_name,
      language_code: userLocale,
    } = message?.from ?? {};
    if (!id) return;

    const name = `${first_name}${last_name ? ` ${last_name}` : ""}`;
    const locale = userLocale ?? DEFAULT_LOCALE;
    const user = await UsersRepository.loadUser({ id, locale, name });

    const command = commandParser(message);

    if (command) {
      return await commandExecuter(command, message, user);
    }

    if (id) await menuController.handleMessage(id, message, user);
  } catch (err) {
    logger.error(err);
  }
};
