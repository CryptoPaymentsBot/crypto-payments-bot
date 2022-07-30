import { config } from "@masterarthur/config";

import { ChatAction, ChatType } from "../../constants.js";
import { bot } from "../bots/bot.js";
import { Command } from "./Command.js";

const DONATE_URL = config("DONATE_URL");

export class DonateCommand extends Command {
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
   * @param {import('./Command.js').Payload} payload
   */
  async method({ chatId }) {
    await bot.sendMessage(
      chatId,
      `<a href="https://bank.gov.ua/en/about/support-the-armed-forces">Support 🇺🇦Ukraine’s Armed Forces</a> | <a href="https://bank.gov.ua/en/about/humanitarian-aid-to-ukraine">Humanitarian Assistance to 🇺🇦Ukrainians</a> | <a href="${DONATE_URL}"> Support Developer (optional)</a>`,
      { parse_mode: "HTML", disable_web_page_preview: true },
    );
  }
}
