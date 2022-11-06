import { AuthService } from "./AuthService.js";
import { BalanceService } from "./BalanceService.js";
import { BotsService } from "./BotsService.js";
import { CacheService } from "./CacheService.js";
import { InvoicesService } from "./InvoicesService.js";
import { ProductsService } from "./ProductsService.js";
import { UsersService } from "./UsersService.js";

const authService = new AuthService();
export const usersService = new UsersService(authService);

export const servicesMap = {
  AuthService: authService,
  BalanceService: new BalanceService(),
  CacheService: new CacheService(),
  BotsService: new BotsService(authService),
  InvoicesService: new InvoicesService(authService),
  ProductsService: new ProductsService(authService),
  UsersService: usersService,
};
