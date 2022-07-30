import IORedis from "ioredis";

import { config } from "../config.js";
import { logger } from "../logger.js";

const REDIS_URL = config("REDIS_URL");

export const redisClient = new IORedis(REDIS_URL);

redisClient.on("error", (error) => {
  logger.error("[redis]", error);
  if (error?.code === "ECONNREFUSED") process.exit(1);
});
