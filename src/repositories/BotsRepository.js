import { Bot } from "../models/Bot.js";
import { prepareRecord } from "../utils/prepareRecord.js";

export class BotsRepository {
  /**
   *
   * @param {Number} ownerId
   * @returns {Promise<Bot[]>}
   */
  static async getBots(ownerId) {
    const documents = await this.collection.find({ ownerId }).toArray();

    return documents.map((botDocument) => new Bot(botDocument));
  }

  /**
   *
   * @param {Number} id
   * @returns {Promise<Bot | null>}
   */
  static async getBot(id) {
    const doc = await this.collection.findOne({ id });

    return doc && new Bot(doc);
  }

  /**
   *
   * @param {Bot} bot
   */
  static async update(bot) {
    const { _id } = bot;

    if (_id) {
      return this.collection.updateOne(
        { _id },
        { $set: prepareRecord(bot) },
        { upsert: true },
      );
    } else {
      return this.collection.insertOne(bot);
    }
  }

  static async count() {
    return this.collection.estimatedDocumentCount({});
  }
}
