import * as fastify from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    bot: { rowId: number; telegramId: number };
  }
}
