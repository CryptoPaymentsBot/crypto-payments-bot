import { AuthService } from "../../services/AuthService.js";
import { CacheService } from "../../services/CacheService.js";
import { HttpError } from "../errors/HttpError.js";

export class AuthController {
  /**
   *
   * @param {AuthService} authService
   * @param {CacheService} cacheService
   */
  constructor(authService, cacheService) {
    this.authService = authService;
    this.cacheService = cacheService;
  }

  CACHE_KEY = "AUTH_CACHE";
  CACHE_TIME_IN_SECONDS = 15;

  /**
   * @type {import("fastify").onRequestAsyncHookHandler}
   */
  async authOnRequest(request) {
    const apiKey = request.headers["API-KEY"];
    if (typeof apiKey !== "string")
      throw new HttpError(401, '"API-KEY" header is required');
    if (!this.authService.preValidateApiKey(apiKey))
      throw new HttpError(401, '"API-KEY" has invalid format');
    const cachedFound = await this.cacheService.get(this.CACHE_KEY);
    if (!(cachedFound === null || cachedFound === undefined)) return;

    const bot = await this.authService.findByApiKey({ apiKey });
    const found = Boolean(bot);

    this.cacheService.setex(this.CACHE_KEY, this.CACHE_TIME_IN_SECONDS, found);

    if (!found) throw new HttpError(401, '"API-KEY" is not found');
    return;
  }
}
