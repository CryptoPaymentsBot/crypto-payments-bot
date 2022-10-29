import { isRoute } from "../utils/isRoute.js";
/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {{[s: string]: any;}} controller
 */
export const loadController = (fastify, controller) => {
  Object.values(controller).forEach((route) => {
    if (isRoute(route)) {
      fastify.log.info(`loading ${route.method} ${route.url}`);
      fastify.route(route);
    }
  });
};
