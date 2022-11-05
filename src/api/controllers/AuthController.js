import { AuthService } from "../../services/AuthService.js";
import { CacheService } from "../../services/CacheService.js";
import { sha256 } from "../../utils/sha256.js";
import { HttpError } from "../errors/HttpError.js";

export class AuthController {
  /**
   *
   * @param {object} params
   * @param {AuthService} params.authService
   * @param {CacheService} params.cacheService
   */
  constructor({ authService, cacheService }) {
    this.authService = authService;
    this.cacheService = cacheService;
  }

  CACHE_KEY = "AUTH_CACHE";
  CACHE_TIME_IN_SECONDS = 30;

  /**
   * @param {string} apiKey
   */
  generateCacheKey(apiKey) {
    return `${this.CACHE_KEY}:${sha256(apiKey)}`;
  }

  /**
   * @param {import("fastify").FastifyRequest} request
   */
  async authOnRequest(request) {
    const apiKey = request.headers["API-KEY"];
    if (typeof apiKey !== "string")
      throw new HttpError(401, '"API-KEY" header is required');
    if (!this.authService.preValidateApiKey(apiKey))
      throw new HttpError(401, '"API-KEY" has invalid format');

    const cacheKey = this.generateCacheKey(apiKey);

    const cachedIds = await this.cacheService.get(cacheKey);

    if (cachedIds && cachedIds.telegramId && cachedIds.rowId) {
      request.bot = cachedIds;
      return;
    }

    const bot = await this.authService.findByApiKey({ apiKey });

    if (!bot) {
      this.cacheService.setex(cacheKey, this.CACHE_TIME_IN_SECONDS, null);
      throw new HttpError(401, '"API-KEY" is not found');
    }

    const botIds = { rowId: bot.id, telegramId: bot.telegramId };

    this.cacheService.setex(cacheKey, this.CACHE_TIME_IN_SECONDS, botIds);

    request.bot = botIds;

    return;
  }
}
