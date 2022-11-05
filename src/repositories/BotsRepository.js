import { Bot } from "../models/Bot.js";
import { Model } from "../models/Model.js";
import { prismaClient } from "./PrismaClient.js";

export class BotsRepository {
  /**
   * @param {object} where
   * @param {string} [where.apiKeyHash]
   * @param {number} [where.telegramId]
   * @returns {Promise<(Bot & {id: number}) | null>}
   */
  static async getBot(where) {
    const bot = await prismaClient.bot.findFirst({ where });
    if (!bot) return null;
    // @ts-ignore
    return new Bot(bot);
  }

  /**
   *
   * @param {Bot} bot
   */
  static async update(bot) {
    const { id, ...data } = bot;

    Model.removeRelations(data);

    if (id) {
      // @ts-ignore
      return await prismaClient.bot.update({ where: { id }, data });
    }
    // @ts-ignore
    return await prismaClient.bot.create({ data });
  }

  static async count() {
    return await prismaClient.bot.count();
  }
}
