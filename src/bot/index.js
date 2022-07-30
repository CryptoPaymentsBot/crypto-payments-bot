import { config } from "../config.js";
import { init } from "../init.js";
import { logger } from "../logger.js";
import { bot } from "./bots/bot.js";
import { updateHandler } from "./bots/updateHandler.js";

const ALLOWED_UPDATES = config({
  path: "ALLOWED_UPDATES",
  cast: JSON.parse,
  validate: Array.isArray,
});

await init();

for (const updateType of ALLOWED_UPDATES) {
  bot.on(updateType, updateHandler(updateType));
}

await bot.startPolling();
logger.log(`Bot is started at ${new Date().toLocaleString()}`);
