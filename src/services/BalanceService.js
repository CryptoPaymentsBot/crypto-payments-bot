import { Bot } from "../models/Bot.js";
import { BaseService } from "./BaseService.js";

export class BalanceService extends BaseService {
  /**
   * @param {Bot} bot
   */
  async getBalances(bot) {
    const firstAccount = bot.addresses[0];
  }
}
