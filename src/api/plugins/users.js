import { UsersService } from "../../services/UsersService.js";
import { UsersController } from "../controllers/UsersController.js";
import { loadController } from "../loadController.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 */
export const usersPlugin = (fastify) => {
  const service = new UsersService();
  const controller = new UsersController(service);

  loadController(fastify, controller);
};
