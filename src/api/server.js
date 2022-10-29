import FastifyRateLimit from "@fastify/rate-limit";
import FastifySwagger from "@fastify/swagger";
import Fastify from "fastify";

import { config, packageMetadata } from "../config.js";
import { ENVS } from "../constants.js";

const logger =
  config("ENV") === ENVS.DEV
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      }
    : true;

export const server = Fastify({
  logger,
});

server.register(FastifySwagger, {
  mode: "dynamic",
  openapi: {
    openapi: "3.0.0",
    info: {
      title: packageMetadata.name,
      description: packageMetadata.description,
      version: packageMetadata.version,
    },
    tags: [
      {
        name: "Users",
      },
      {
        name: "Bots",
      },
      {
        name: "Products",
      },
      {
        name: "Invoices",
      },
    ],
  },
  routePrefix: "/docs",
  exposeRoute: true,
  uiConfig: {
    deepLinking: false,
  },
});

server.register(FastifyRateLimit, {
  max: 15,
  timeWindow: "1 minute",
  ban: 5,
});

server.setNotFoundHandler(async (request, reply) => {
  reply.status(404);
  return {
    message: `Route ${request.method}:${request.url} not found`,
    error: "Not Found",
    statusCode: 404,
  };
});
