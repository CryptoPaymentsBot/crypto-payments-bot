import {
  AT_SIGN,
  NOT_FOUND_INDEX,
  STRING_START_INDEX,
} from "../../src/constants.js";

export class UserCommand {
  /**
   *
   * @param {string} commandName - /commandName[@username]
   *
   * @returns {string} commandName without [@username]
   */
  static clearUsernameFromCommand(commandName) {
    const atSignIndex = commandName.indexOf(AT_SIGN);

    if (atSignIndex == NOT_FOUND_INDEX) {
      return commandName;
    }

    return commandName.substring(STRING_START_INDEX, atSignIndex);
  }

  /**
   *
   * @param {string} commandName - /commandName
   * @param {string} arg - /commandName argument
   */
  constructor(commandName, arg) {
    if (!commandName) {
      throw new Error('"commandName" is required');
    }
    /**
     * @property {string} commandName - /commandName
     */
    this.commandName = UserCommand.clearUsernameFromCommand(commandName);

    /**
     * @property {string} argument - /commandName argument
     */
    this.argument = arg;
  }

  toString() {
    return `/${this.commandName} ${this.argument}`;
  }
}
