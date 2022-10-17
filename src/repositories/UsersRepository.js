/**
 * @typedef {User & {_id:import('bson').ObjectId}} UserDocument
 */

import { logger } from "../logger.js";
import { User } from "../models/User.js";
import { prepareRecord } from "../utils/prepareRecord.js";
import { prismaClient } from "./PrismaClient.js";

export class UsersRepository {
  /**
   *
   * @param {Number} telegramId
   * @returns {Promise<User | null>}
   */
  static async getUser(telegramId) {
    const doc = await prismaClient.user.findFirst({ where: { telegramId } });

    return doc && new User(doc);
  }

  /**
   *
   * @param {User} user
   */
  static async update(user) {
    if (!this.collection)
      throw new Error("UsersRepository collections is not loaded");
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
      throw new Error("UsersRepository collections is not loaded");
    return this.collection.estimatedDocumentCount({});
  }
}
