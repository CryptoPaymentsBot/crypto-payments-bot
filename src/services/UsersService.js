import { logger } from "../logger.js";
import { User } from "../models/user.js";
import { UsersRepository } from "../repositories/UsersRepository.js";

export class UsersService {
  /**
   *
   * @param {object} params
   * @param {number} params.id
   * @param {string} params.name
   * @param {string} params.locale
   *
   * @returns {Promise<User>}
   */
  async loadUser({ id, locale, name }) {
    const user = await UsersRepository.getUser(id);
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
  async createUser({ id, name, locale }) {
    const user = new User({ id, name, locale });

    logger.log(`[NEW USER] #id${id} ${name}`);

    await UsersRepository.update(user);

    return user;
  }
}
