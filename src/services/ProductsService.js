import { AuthService } from "./AuthService.js";
import { BaseService } from "./BaseService.js";

export class ProductsService extends BaseService {
  /**
   * @param {AuthService} authService
   */
  constructor(authService) {
    super();
    this.authService = authService;
  }
}
