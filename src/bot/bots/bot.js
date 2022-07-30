import TelegramBot from "node-telegram-bot-api";

import { config } from "../../config.js";

const TELEGRAM_BOT_TOKEN = config("TELEGRAM_BOT_TOKEN");

export const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);
