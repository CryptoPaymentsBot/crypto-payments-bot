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
   * @param {Bot} user
   */
  static async update(user) {
    if (!this.collection)
      throw new Error("BotsRepository collections is not loaded");
    const { _id } = user;

    if (_id) {
      return this.collection.updateOne(
        { _id },
        { $set: prepareRecord(user) },
        { upsert: true },
      );
    } else {
      return this.collection.insertOne(user);
    }
  }

  static async count() {
    if (!this.collection)
      throw new Error("BotsRepository collections is not loaded");
    return this.collection.estimatedDocumentCount({});
  }
}
