import { AuthService } from "../../services/AuthService.js";
import { CacheService } from "../../services/CacheService.js";
import { ProductsService } from "../../services/ProductsService.js";
import { BaseController } from "./BaseController.js";

export class ProductsController extends BaseController {
  static services = [AuthService, CacheService, ProductsService];
  /**
   * @param {object} params
   * @param {AuthService} params.authService
   * @param {CacheService} params.cacheService
   * @param {ProductsService} params.productsService
   */
  constructor({ authService, cacheService, productsService }) {
    super({ authService, cacheService });
    this.productsService = productsService;
  }
}
