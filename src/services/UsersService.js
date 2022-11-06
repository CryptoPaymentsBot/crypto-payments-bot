import { logger } from "../logger.js";
import { User } from "../models/User.js";
import { UsersRepository } from "../repositories/UsersRepository.js";
import { AuthService } from "./AuthService.js";
import { BaseService } from "./BaseService.js";

export class UsersService extends BaseService {
  /**
   * @param {AuthService} authService
   */
  constructor(authService) {
    super();
    this.authService = authService;
  }
  /**
   *
   * @param {object} param
   * @param {number} param.telegramId
   */
  async find({ telegramId }) {
    return UsersRepository.getUser(telegramId);
  }

  /**
   * This method loads users for updates processing
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

    return this.createUser({ telegramId: id, locale, name, isConfirmed: true });
  }

  /**
   *
   * @param {object} params
   * @param {number} params.telegramId
   * @param {string} params.name
   * @param {string} params.locale
   * @param {boolean} params.isConfirmed
   *
   * @returns {Promise<User>}
   */
  async createUser({ telegramId, name, locale, isConfirmed }) {
    const user = new User({ telegramId, name, locale, isConfirmed });

    logger.log(`[NEW USER] #id${telegramId} ${name}`);

    await UsersRepository.update(user);

    return user;
  }
}
