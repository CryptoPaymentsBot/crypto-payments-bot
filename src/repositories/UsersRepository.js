/**
 * @typedef {User & {_id:import('bson').ObjectId}} UserDocument
 */

import { Model } from "../models/Model.js";
import { User } from "../models/User.js";
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
    const { id, ...data } = user;

    Model.removeRelations(data);

    if (id) {
      return await prismaClient.user.update({ where: { id }, data });
    } else {
      return await prismaClient.user.create({ data });
    }
  }

  static async count() {
    return await prismaClient.user.count();
  }
}
