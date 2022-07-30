/**
 * @typedef PrefixMethodResult
 * @property {boolean} continue
 * @property {string} [text]
 * @property {string} [menuToStart]
 */

export class Prefix {
  /**
   * @param {string} _startTag
   *
   * @returns {boolean}
   */
  static testTag(_startTag) {
    throw new Error('"testTag" is not implemented');
  }

  /**
   * @param {import('../commands/Command').Payload} _payload
   *
   * @returns {Promise<PrefixMethodResult>}
   */
  static async method(_payload) {
    throw new Error('"Tag.method" is not implemented');
  }
}
