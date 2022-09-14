/**
 * @typedef {Bot & {_id:import('bson').ObjectId}} BotDocument
 */

import { logger } from "../logger.js";
import { Bot } from "../models/bot.js";
import { prepareRecord } from "../utils/prepareRecord.js";

export class BotsRepository {
  /**
   * @type {import("mongodb").Collection<BotDocument> | null}
   */
  static collection = null;

  /**
   *
   * @param {import("mongodb").Collection<BotDocument>} collection
   */
  static async load(collection) {
    this.collection = collection;
    await collection.createIndex("id");
    await collection.createIndex("ownerId");
    await collection.createIndex("apiKey");
    logger.log("[REPOSITORY] BotsRepository loaded");
  }

  /**
   *
   * @param {Number} ownerId
   * @returns {Promise<Bot[]>}
   */
  static async getBots(ownerId) {
    if (!this.collection)
      throw new Error("BotsRepository collections is not loaded");
    const documents = await this.collection.find({ ownerId }).toArray();

    return documents.map((botDocument) => new Bot(botDocument));
  }

  /**
   *
   * @param {Number} id
   * @returns {Promise<Bot | null>}
   */
  static async getBot(id) {
    if (!this.collection)
      throw new Error("BotsRepository collections is not loaded");
    const doc = await this.collection.findOne({ id });

    return doc && new Bot(doc);
  }

  /**
   *
   * @param {Bot} bot
   */
  static async update(bot) {
    if (!this.collection)
      throw new Error("BotsRepository collections is not loaded");
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
    if (!this.collection)
      throw new Error("BotsRepository collections is not loaded");
    return this.collection.estimatedDocumentCount({});
  }
}
