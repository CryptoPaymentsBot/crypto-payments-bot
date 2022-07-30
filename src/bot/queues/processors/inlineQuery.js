import { config } from "../../../config.js";
import { MAX_INLINE_RESULTS } from "../../../constants.js";
import { DEFAULT_LOCALE, t18g } from "../../../locales/t18g.js";
import { logger } from "../../../logger.js";
import { UsersRepository } from "../../../repositories/UsersRepository.js";
import { Timedelta } from "../../../types/Timedelta.js";
import { bot } from "../../bots/bot.js";
import { inlineQueryExecuter } from "../../inline/executer.js";

const INLINE_QUERY_CACHE_TIME = config("INLINE_QUERY_CACHE_TIME");

/**
 *  @param {import('bull').Job<import("node-telegram-bot-api").InlineQuery>}  job
 */
export const inlineQueryJobProcessor = async ({ data: inlineQuery }) => {
  const {
    query,
    id: queryId,
    from: { id: userId, language_code: locale },
    offset,
  } = inlineQuery;
  const currentOffset = +(offset || 0);
  const start = Timedelta.getTimestamp();

  try {
    const {
      id,
      first_name,
      last_name,
      language_code: userLocale,
    } = inlineQuery?.from ?? {};
    const name = `${first_name}${last_name ? ` ${last_name}` : ""}`;
    const locale = userLocale ?? DEFAULT_LOCALE;
    const user = await UsersRepository.loadUser({
      id,
      locale,
      name,
    });

    const results = await inlineQueryExecuter({
      user,
      query,
      locale,
      offset: currentOffset,
    });

    const additionalParams =
      results.length === 0 && currentOffset === 0
        ? {
            switch_pm_parameter: "query",
            switch_pm_text: t18g(locale)`not_found`,
          }
        : {};

    const answered = await bot.answerInlineQuery(queryId, results, {
      cache_time: INLINE_QUERY_CACHE_TIME,
      is_personal: true,
      next_offset: `${currentOffset + MAX_INLINE_RESULTS}`,
      ...additionalParams,
    });

    if (answered) {
      logger.log(
        `[${new Date().toLocaleString()}][#id${userId}][inlineQuery][offset:${currentOffset}] ${query} ${new Timedelta(
          start,
          Timedelta.getTimestamp(),
        )}`,
      );
    }
  } catch (err) {
    logger.error(err);
  }
};
