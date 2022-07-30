/**
 *
 * @param {any} value
 * @returns {value is import("fastify").RouteOptions}
 */
export const isRoute = (value) =>
  typeof value?.method === "string" &&
  typeof value?.url === "string" &&
  typeof value?.handler === "function";
