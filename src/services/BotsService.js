import { logger } from "../logger.js";
import { Bot } from "../models/Bot.js";
import { BotsRepository } from "../repositories/BotsRepository.js";
import { sha256 } from "../utils/sha256.js";
import { Wallet } from "../wallet/wallet.js";
import { AuthService } from "./AuthService.js";
import { BaseService } from "./BaseService.js";

export class BotsService extends BaseService {
  /**
   * @param {AuthService} authService
   */
  constructor(authService) {
    super();
    this.authService = authService;
  }

  /**
   *
   * @param {string} botToken
   * @returns
   */
  generateBotInfoUrl = (botToken) =>
    `https://api.telegram.org/bot${botToken}/getMe`;

  /**
   *
   * @param {object} params
   * @param {number} params.userId
   * @param {string} params.botToken
   *
   * @returns {Promise<{bot: Bot, mnemonic: string, apiKey: string}>}
   */
  async createBot({ userId, botToken }) {
    const botInfoResponse = await fetch(this.generateBotInfoUrl(botToken));
    /**
     * @type {import("node-telegram-bot-api").User}
     */
    const { id, username, first_name: name } = await botInfoResponse.json();
    const { addresses, mnemonic } = await Wallet.createAccounts();
    const apiKey = this.authService.generateBotApiKey();

    const bot = new Bot({
      telegramId: id,
      userId,
      name,
      addresses,
      username: `${username}`,
      apiKeyHash: sha256(apiKey),
      tokenHash: sha256(botToken),
    });

    logger.log(`[NEW BOT] #id${id} #userId${userId} ${name}`);

    await BotsRepository.update(bot);

    return { bot, mnemonic, apiKey };
  }
}
