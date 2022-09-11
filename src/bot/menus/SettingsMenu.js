import { ParseMode } from "../../constants.js";
import { t18g } from "../../locales/t18g.js";
import { bot } from "../bots/bot.js";
import { Menu } from "./Menu.js";
import { MenuNames } from "./names.js";

export class SettingsMenu extends Menu {
  static NAME = MenuNames.SETTINGS;

  constructor() {
    super(SettingsMenu.NAME);

    this.on("back", this.onBack);
    this.on("change_language", this.onChangeLanguage);
    this.on(Menu.Events.OUTHER, this.onOther);
  }

  get buttons() {
    return [["change_language", "back"]];
  }

  /**
   *
   * @param {import('./Menu').StartParams} params
   */
  async start({ chatId, locale }) {
    await bot.sendMessage(chatId, t18g(locale)`settings_text`, {
      parse_mode: ParseMode.HTML,
      reply_markup: {
        resize_keyboard: true,
        keyboard: this.getKeyboard(locale),
      },
    });

    return true;
  }

  /**
   * @param {import('./Menu').EventParams} params
   *
   * @returns {Promise<Object>}
   */
  async onChangeLanguage({ id, user, message, locale }) {
    if (!this.controller) return;

    await this.controller.startMenu({
      message,
      user,
      menuName: MenuNames.USER_LANG,
      locale,
      id,
    });
  }

  /**
   * @param {import('./Menu').EventParams} params
   *
   * @returns {Promise<Object>}
   */
  async onBack({ message, user, menuNode, locale, id }) {
    if (!this.controller) return;

    await this.controller.startMenu({
      message,
      user,
      menuName: menuNode?.parent?.name ?? MenuNames.MAIN,
      locale,
      id,
    });
  }

  /**
   * @param {import('./Menu').EventParams} params
   *
   * @returns {Promise<Object>}
   */
  async onOther({ message, user, locale, id }) {
    if (!this.controller) return;

    await this.controller.startMenu({
      message,
      user,
      menuName: MenuNames.SETTINGS,
      locale,
      id,
    });
  }
}
