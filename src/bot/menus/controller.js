import { MainMenu } from "./MainMenu.js";
import { MenuController } from "./MenuController.js";
import { MenuNode } from "./MenuNode.js";

const mainMenu = new MainMenu();

const menuTree = new MenuNode(mainMenu, []);

export const menuController = new MenuController(menuTree);
