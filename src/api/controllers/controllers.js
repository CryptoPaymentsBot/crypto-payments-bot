import { BaseController } from "./BaseController.js";
import { BotsController } from "./BotsController.js";
import { InvoicesController } from "./InvoicesController.js";
import { ProductsController } from "./ProductsController.js";
import { UsersController } from "./UsersController.js";

/**
 * @type {(typeof BaseController)[]}
 */
export const controllers = [
  UsersController,
  BotsController,
  InvoicesController,
  ProductsController,
];
