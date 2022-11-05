import { botsPlugin } from "./bots.js";
import { usersPlugin } from "./users.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 */
export const controllersPlugin = (fastify) => {
  fastify.decorateRequest("bot", null);
  usersPlugin(fastify);
  botsPlugin(fastify);
};
