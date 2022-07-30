import { config } from "./src/config.js";

const appType = config("APP");

switch (appType) {
  case "API":
    await import("./src/api/index.js");
    break;
  case "BOT":
  default:
    await import("./src/bot/index.js");
}
