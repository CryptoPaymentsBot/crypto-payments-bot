import { config } from "../../config.js";
import { ParseMode } from "../../constants.js";
import { t18g } from "../../locales/t18g.js";
import { logger } from "../../logger.js";
import { User } from "../../models/user.js";
import { UsersRepository } from "../../repositories/UsersRepository.js";
import { UserCommand } from "../../types/UserCommand.js";
import { bot } from "../bots/bot.js";
import { commandsRoutes } from "./commands.js";

const ADMIN_ID = config("ADMIN_ID");

/**
 *
 * @param {UserCommand} command
 * @param {import('node-telegram-bot-api').Message} message
 * @param {User} user
 */
export const commandExecuter = async (command, message, user) => {
  const { commandName, argument } = command;
  const { date } = message;
  const { id: chatId, type } = message.chat;
  const { id: userId } = message.from ?? {};
  const { locale } = user;

  if (!commandsRoutes[commandName]) return;

  /**
   * @type {import('./Command').Command}
   */
  const commandHandler = commandsRoutes[commandName];

  if (commandHandler.admin && userId !== ADMIN_ID) return;

  if (!commandHandler.types.includes(type)) return;

  try {
    if (commandHandler.action) {
      await bot.sendChatAction(chatId, commandHandler.action);
    }

    /**
     * @type {import('node-telegram-bot-api').Message}
     */
    const responseMessage = await commandHandler.method({
      chatId,
      argument,
      message,
      locale,
      user,
    });

    await UsersRepository.update(user);

    logger.log(
      `[${new Date().toLocaleString()}]${
        userId
          ? `[#id${userId}]${userId !== chatId ? `[#cid${chatId}]` : ""}`
          : ""
      } ${command} ${
        // @ts-ignore
        responseMessage ? new Timedelta(date, responseMessage.date) : ""
      }`,
    );
  } catch (err) {
    logger.error(
      `<[Command: "${command}"]>\n`,
      { chatId, user },
      err,
      `\n<[/Event]>`,
    );
    try {
      await bot.sendMessage(chatId, t18g(locale)`something_went_wrong`, {
        parse_mode: ParseMode.HTML,
      });
    } catch (error) {
      logger.error(
        "<[something_went_wrong]>",
        { chatId, user },
        command,
        error,
        "</[something_went_wrong]>",
      );
    }
  }
};
