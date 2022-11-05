import { AuthService } from "../../services/AuthService.js";
import { BotsService } from "../../services/BotsService.js";
import { CacheService } from "../../services/CacheService.js";
import { BotsController } from "../controllers/BotsController.js";
import { loadController } from "../loadController.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 */
export const botsPlugin = (fastify) => {
  const authService = new AuthService();
  const cacheService = new CacheService();
  const botsService = new BotsService(authService);

  const controller = new BotsController({
    authService,
    cacheService,
    botsService,
  });

  loadController(fastify, controller);
};
