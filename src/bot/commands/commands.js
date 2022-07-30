import { DonateCommand } from "./donate.js";
import { StartCommand } from "./start.js";

export const commandsRoutes = {
  start: new StartCommand(),
  donate: new DonateCommand(),
};
