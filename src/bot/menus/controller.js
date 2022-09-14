import { MainMenu } from "./MainMenu.js";
import { MenuController } from "./MenuController.js";
import { MenuNode } from "./MenuNode.js";
import { SettingsMenu } from "./settings/SettingsMenu.js";
import { UserLanguageMenu } from "./settings/UserLanguageMenu.js";

const mainMenu = new MainMenu();

const settingsMenu = new SettingsMenu();
const userLanguageMenu = new UserLanguageMenu();

const menuTree = new MenuNode(mainMenu, [
  new MenuNode(settingsMenu, [new MenuNode(userLanguageMenu)]),
]);

export const menuController = new MenuController(menuTree);
