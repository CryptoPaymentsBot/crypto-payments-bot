import { config } from "../../config.js";
import { ParseMode } from "../../constants.js";
import { t18g } from "../../locales/t18g.js";
import { logger } from "../../logger.js";
import { User } from "../../models/user.js";
import { RedisStringMap } from "../../types/RedisStringMap.js";
import { Timedelta } from "../../types/Timedelta.js";
import { getTimeInSeconds } from "../../utils/getTimeInSeconds.js";
import { bot } from "../bots/bot.js";
import { MenuNames } from "./names.js";

const DEFAULT_MENU = config("DEFAULT_MENU", MenuNames.MAIN);

export class MenuController {
  /**
   *
   * @param {import('./MenuNode.js').MenuNode} menuTree
   */
  constructor(menuTree) {
    this.menuTree = menuTree;
    this.nodesList = this.flatTree(menuTree);
    /**
     * @type {import('./Menu.js').Menu[]}
     */
    this.menus = this.nodesList.map(({ menu }) => {
      menu.controller = this;
      return menu;
    });
    this.chatsMap = new RedisStringMap("MenuController_chatsMap");
  }

  /**
   *
   * @param {import('./MenuNode.js').MenuNode} menuNode
   * @returns {import('./MenuNode.js').MenuNode[]}
   */
  flatTree(menuNode) {
    return [
      menuNode,
      ...(menuNode?.submenus?.map?.((node) => this.flatTree(node))?.flat?.() ??
        []),
    ];
  }

  /**
   *
   * @param {String} name
   * @returns {import('./MenuNode.js').MenuNode | undefined}
   */
  getNodeByMenuName(name) {
    return this.nodesList.find((menuToFind) => menuToFind.name === name);
  }

  /**
   *
   * @param {Object} params
   * @param {Number} params.id
   * @param {String} params.menuName
   * @param {String} params.locale
   * @param {import('node-telegram-bot-api').Message} params.message
   * @param {User} params.user
   * @param {Object} [params.options]
   */
  async startMenu(params) {
    const { id, menuName, locale, message, user, options } = params;
    const menuToOpen = menuName ?? DEFAULT_MENU;
    try {
      const node = this.getNodeByMenuName(menuToOpen);

      if (!node) return;

      const { menu } = node;
      const startedTimestamp = getTimeInSeconds();
      const isStarted = await menu.start({
        chatId: id,
        locale,
        message,
        user,
        options,
      });

      if (isStarted) {
        // change menu only if it's started correctly
        await this.chatsMap.set(`${id}`, node.name);
        logger.log(
          `[${new Date().toLocaleString()}][#id${id}] opens "${menuToOpen}" menu ${new Timedelta(
            startedTimestamp,
            getTimeInSeconds(),
          )}`,
        );

        return;
      }
      logger.log(
        `[${new Date().toLocaleString()}][#id${id}] tried to open "${menuToOpen}" menu ${new Timedelta(
          startedTimestamp,
          getTimeInSeconds(),
        )}`,
      );
    } catch (err) {
      logger.error(
        `<[Menu opening: "${menuToOpen}"]>\n`,
        params,
        err,
        `\n<[/Menu opening]>`,
      );
      try {
        await bot.sendMessage(id, t18g(locale)`something_went_wrong`, {
          parse_mode: ParseMode.HTML,
        });
      } catch (error) {
        logger.error(
          "<[something_went_wrong]>",
          params,
          error,
          "</[something_went_wrong]>",
        );
      }
    }
  }

  /**
   *
   * @param {Number} id
   * @param {import('node-telegram-bot-api').Message} message
   * @param {User} user
   * @returns
   */
  async handleMessage(id, message, user) {
    const menuName = await this.chatsMap.get(`${id}`);

    if (!menuName) return;

    const node = this.getNodeByMenuName(menuName);

    if (!node) return;

    const { menu } = node;

    return menu.handleMessage(message, node, user);
  }
}
