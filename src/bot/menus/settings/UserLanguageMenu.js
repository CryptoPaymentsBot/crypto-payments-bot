import { ParseMode } from "../../../constants.js";
import { t18g } from "../../../locales/t18g.js";
import { logger } from "../../../logger.js";
import { UsersRepository } from "../../../repositories/UsersRepository.js";
import { bot } from "../../bots/bot.js";
import { Menu } from "../Menu.js";
import { MenuNames } from "../names.js";

export class UserLanguageMenu extends Menu {
  static NAME = MenuNames.USER_LANG;

  static TextToLanguage = {};

  constructor() {
    super(UserLanguageMenu.NAME);
    this.on(Menu.Events.ALL, this.onAll);

    this.allLocales = this.buttons.flat(2);

    logger.log("[UserLanguageMenu][ALL LOCALES]", this.allLocales);
  }

  get buttons() {
    return [["ru", "ua"], ["en"]];
  }

  /**
   *
   * @param {import('../Menu').StartParams} param0
   */
  async start({ chatId, locale }) {
    await bot.sendMessage(chatId, t18g(locale)`change_language_text`, {
      parse_mode: ParseMode.HTML,
      reply_markup: {
        resize_keyboard: true,
        keyboard: this.getKeyboard(locale),
      },
    });

    return true;
  }

  /**
   *
   * @param {import('../Menu').EventParams} params
   */
  async onAll({ user, id, message, key }) {
    if (!this.controller) return;

    if (!this.allLocales.includes(key)) {
      await this.controller.startMenu({
        id,
        user,
        menuName: MenuNames.USER_LANG,
        locale: user.locale,
        message,
      });
      return;
    }

    user.changeLocale(key);

    await UsersRepository.update(user);

    await this.controller.startMenu({
      id,
      user,
      menuName: MenuNames.MAIN,
      locale: user.locale,
      message,
      options: {
        text: t18g(user.locale)`you_language_changed`,
      },
    });
  }
}
