import { createHash, randomBytes } from "crypto";

import { logger } from "../logger.js";
import { Bot } from "../models/Bot.js";
import { BotsRepository } from "../repositories/BotsRepository.js";
import { Wallet } from "../wallet/wallet.js";

export class BotsService {
  /**
   *
   * @param {string} botToken
   * @returns
   */
  generateBotInfoUrl = (botToken) =>
    `https://api.telegram.org/bot${botToken}/getMe`;

  generateBotApiKey() {
    return randomBytes(32).toString("hex");
  }

  /**
   *
   * @param {object} params
   * @param {number} params.userId
   * @param {string} params.botToken
   *
   * @returns {Promise<{bot: Bot, mnemonic: string}>}
   */
  async createBot({ userId, botToken }) {
    const botInfoResponse = await fetch(this.generateBotInfoUrl(botToken));
    /**
     * @type {import("node-telegram-bot-api").User}
     */
    const { id, username, first_name: name } = await botInfoResponse.json();
    const { addresses, mnemonic } = await Wallet.createAccounts();

    const bot = new Bot({
      id,
      userId,
      name,
      addresses,
      username: `${username}`,
      apiKey: this.generateBotApiKey(),
      tokenHash: createHash("sha256").update(botToken).digest("hex"),
    });

    logger.log(`[NEW BOT] #id${id} #ownerId${ownerId} ${name}`);

    await BotsRepository.update(bot);

    return { bot, mnemonic };
  }
}
