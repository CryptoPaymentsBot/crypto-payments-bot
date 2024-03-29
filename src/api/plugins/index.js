import { controllersPlugin } from "./controllers.js";

/**
 * @type {import("fastify").FastifyPluginCallback<import("fastify").FastifyPluginOptions, import("fastify").RawServerDefault, import("fastify").FastifyTypeProviderDefault>}
 */
export async function localPlugins(fastify, options, done) {
  controllersPlugin(fastify);
  done();
}
