/**
 * @typedef {User & {_id:import('bson').ObjectId}} UserDocument
 */

import { logger } from "../logger.js";
import { User } from "../models/user.js";
import { prepareRecord } from "../utils/prepareRecord.js";

export class UsersRepository {
  /**
   * @type {import("mongodb").Collection<UserDocument> | null}
   */
  static collection = null;

  /**
   *
   * @param {import("mongodb").Collection<UserDocument>} collection
   */
  static async load(collection) {
    this.collection = collection;
    await collection.createIndex("id");
    logger.log("[REPOSITORY] UsersRepository loaded");
  }

  /**
   *
   * @param {Number} id
   * @returns {Promise<User | null>}
   */
  static async getUser(id) {
    if (!this.collection)
      throw new Error("UsersRepository collections is not loaded");
    const doc = await this.collection.findOne({ id });

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

  /**
   *
   * @param {object} params
   * @param {number} params.id
   * @param {string} params.name
   * @param {string} params.locale
   *
   * @returns {Promise<User>}
   */
  static async loadUser({ id, locale, name }) {
    const user = await this.getUser(id);
    if (user) return user;

    return this.createUser({ id, locale, name });
  }

  /**
   *
   * @param {object} params
   * @param {number} params.id
   * @param {string} params.name
   * @param {string} params.locale
   *
   * @returns {Promise<User>}
   */
  static async createUser({ id, name, locale }) {
    const user = new User({ id, name, locale });

    logger.log(`[NEW USER] #id${id} ${name}`);

    await this.update(user);

    return user;
  }

  static async count() {
    if (!this.collection)
      throw new Error("UsersRepository collections is not loaded");
    return this.collection.estimatedDocumentCount({});
  }
}
