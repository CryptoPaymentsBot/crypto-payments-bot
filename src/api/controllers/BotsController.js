import { AuthService } from "../../services/AuthService.js";
import { BotsService } from "../../services/BotsService.js";
import { CacheService } from "../../services/CacheService.js";
import { AuthController } from "./AuthController.js";

export class BotsController extends AuthController {
  /**
   * @param {object} params
   * @param {AuthService} params.authService
   * @param {CacheService} params.cacheService
   * @param {BotsService} params.botsService
   */
  constructor({ authService, cacheService, botsService }) {
    super({ authService, cacheService });
  }
}
