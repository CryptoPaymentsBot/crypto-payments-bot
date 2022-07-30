import { DEFAULT_LOCALE } from "../../../locales/t18g.js";
import { logger } from "../../../logger.js";
import { UsersRepository } from "../../../repositories/UsersRepository.js";
import { Timedelta } from "../../../types/Timedelta.js";
import { bot } from "../../bots/bot.js";
import { callbackController } from "../../callback/controller.js";

/**
 *  @param {import('bull').Job<import("node-telegram-bot-api").CallbackQuery>}  job
 */
export const callbackQueryJobProcessor = async ({ data: callbackQuery }) => {
  const {
    data,
    id: queryId,
    from: { id: userId, language_code: locale },
  } = callbackQuery;
  const start = Timedelta.getTimestamp();

  try {
    const {
      id,
      first_name,
      last_name,
      language_code: locale,
    } = callbackQuery?.from ?? {};
    const name = `${first_name}${last_name ? ` ${last_name}` : ""}`;

    const user = await UsersRepository.loadUser({
      id,
      locale: locale ?? DEFAULT_LOCALE,
      name,
    });

    const answered = await bot.answerCallbackQuery(
      queryId,
      await callbackController.handleCallbackQuery({
        callbackQuery,
        user,
      }),
    );

    if (answered) {
      logger.log(
        `[${new Date().toLocaleString()}][#id${userId}][callbackQuery] ${data} ${new Timedelta(
          start,
          Timedelta.getTimestamp(),
        )}`,
      );
    }
  } catch (err) {
    logger.error(err);
  }
};
