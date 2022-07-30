import Bull from "bull";

import { config } from "../../config.js";
import { callbackQueryJobProcessor } from "./processors/callbackQuery.js";
import { inlineQueryJobProcessor } from "./processors/inlineQuery.js";
import { messageJobProcessor } from "./processors/message.js";

const BOT_NAME = config("BOT_NAME");
const REDIS_URL = config("REDIS_URL");
const [MESSAGE, CHOSEN_INLINE_RESULT, INLINE_QUERY, CALLBACK_QUERY] = config({
  path: "ALLOWED_UPDATES",
  cast: JSON.parse,
  validate: Array.isArray,
});

const botQueue = new Bull(BOT_NAME, REDIS_URL, {
  defaultJobOptions: {
    removeOnComplete: true,
  },
  limiter: {
    duration: 1000,
    max: 30,
  },
});

botQueue.process(MESSAGE, messageJobProcessor);
botQueue.process(INLINE_QUERY, inlineQueryJobProcessor);
botQueue.process(CALLBACK_QUERY, callbackQueryJobProcessor);

export default botQueue;
