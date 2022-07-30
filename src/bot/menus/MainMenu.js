import { ParseMode } from "../../constants.js";
import { t18g } from "../../locales/t18g.js";
import { bot } from "../bots/bot.js";
import { Menu } from "./Menu.js";
import { MenuNames } from "./names.js";

export class MainMenu extends Menu {
  static NAME = MenuNames.MAIN;
  constructor() {
    super(MainMenu.NAME);
    this.on("my_media", this.onMyMedia);
    this.on("add_media", this.onAddMedia);
    this.on("settings", this.onSettings);
    this.on(Menu.Events.OUTHER, this.onOther);
  }

  get buttons() {
    return [["my_media", "add_media"], ["settings"]];
  }

  /**
   *
   * @param {import('./Menu').StartParams} params
   */
  async start({ chatId, locale, options, user }) {
    await bot.sendMessage(
      chatId,
      options?.text ?? t18g(locale)`start${user.HTML}`,
      {
        parse_mode: ParseMode.HTML,
        reply_markup: {
          resize_keyboard: true,
          keyboard: this.getKeyboard(locale),
        },
      },
    );

    return true;
  }

  /**
   * @param {import('./Menu').EventParams} params
   *
   * @returns {Promise<Object>}
   */
  async onSettings({ message, user, locale, id }) {
    if (!this.controller) return;

    await this.controller.startMenu({
      message,
      user,
      menuName: MenuNames.MAIN,
      locale,
      id,
    });
  }

  /**
   * @param {import('./Menu').EventParams} params
   *
   * @returns {Promise<Object>}
   */
  async onAddMedia({ message, user, locale, id }) {
    if (!this.controller) return;

    await this.controller.startMenu({
      message,
      user,
      menuName: MenuNames.MAIN,
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
      menuName: MenuNames.MAIN,
      locale,
      id,
    });
  }

  /**
   * @param {import('./Menu').EventParams} params
   *
   * @returns {Promise<Object>}
   */
  async onMyMedia({ locale, id }) {
    await bot.sendMessage(id, t18g(locale)`my_media_text`, {
      parse_mode: ParseMode.HTML,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: t18g(locale)`edit_media`,
              switch_inline_query_current_chat: "edit:",
            },
          ],
          [
            {
              text: t18g(locale)`public`,
              switch_inline_query_current_chat: "public:",
            },
          ],
        ],
      },
    });
  }
}
