import { usersPlugin } from "./users.js";

/**
 * @type {import("fastify").FastifyPluginCallback<import("fastify").FastifyPluginOptions, import("fastify").RawServerDefault, import("fastify").FastifyTypeProviderDefault>}
 */
export async function localPlugins(fastify, options, done) {
  usersPlugin(fastify);
  done();
}
