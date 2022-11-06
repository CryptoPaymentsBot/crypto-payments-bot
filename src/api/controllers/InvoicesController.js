import { AuthService } from "../../services/AuthService.js";
import { CacheService } from "../../services/CacheService.js";
import { InvoicesService } from "../../services/InvoicesService.js";
import { BaseController } from "./BaseController.js";

export class InvoicesController extends BaseController {
  static services = [AuthService, CacheService, InvoicesService];

  /**
   * @param {object} params
   * @param {AuthService} params.authService
   * @param {CacheService} params.cacheService
   * @param {InvoicesService} params.invoicesService
   */
  constructor({ authService, cacheService, invoicesService }) {
    super({ authService, cacheService });
    this.invoicesService = invoicesService;
  }
}
