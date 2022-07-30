import FastifyRateLimit from "@fastify/rate-limit";
import FastifySwagger from "@fastify/swagger";
import Fastify from "fastify";

export const server = Fastify({ logger: true });

server.register(FastifySwagger, {
  routePrefix: "/docs",
  exposeRoute: true,
  uiConfig: {
    docExpansion: "full",
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
