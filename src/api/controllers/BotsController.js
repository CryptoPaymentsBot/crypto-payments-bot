import { AuthService } from "../../services/AuthService.js";
import { BotsService } from "../../services/BotsService.js";
import { CacheService } from "../../services/CacheService.js";
import { BaseController } from "./BaseController.js";

export class BotsController extends BaseController {
  /**
   * @param {object} params
   * @param {AuthService} params.authService
   * @param {CacheService} params.cacheService
   * @param {BotsService} params.botsService
   */
  constructor({ authService, cacheService, botsService }) {
    super({ authService, cacheService });
    this.botsService = botsService;
  }
}
