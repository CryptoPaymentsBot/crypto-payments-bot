import { AuthService } from "../../services/AuthService.js";
import { CacheService } from "../../services/CacheService.js";
import { UsersService } from "../../services/UsersService.js";
import { UsersController } from "../controllers/UsersController.js";
import { loadController } from "../loadController.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 */
export const usersPlugin = (fastify) => {
  const authService = new AuthService();
  const cacheService = new CacheService();
  const userService = new UsersService();

  const controller = new UsersController({
    authService,
    cacheService,
    userService,
  });

  loadController(fastify, controller);
};
