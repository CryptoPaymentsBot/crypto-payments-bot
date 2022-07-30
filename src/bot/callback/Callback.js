/**
 * @typedef CallbackMethodResult
 * @property {string} [text]
 * @property {boolean} [show_alert]
 * @property {string} [url]
 * @property {string} [url]
 * @property {number} [cache_time]
 */

export class Callback {
  /**
   * @param {string} _data
   *
   * @returns {boolean}
   */
  static testData(_data) {
    throw new Error('"testData" is not implemented');
  }

  /**
   * @param {import('./CallbackController.js').CallbackPayload} _payload
   *
   * @returns {Promise<CallbackMethodResult>}
   */
  static async method(_payload) {
    throw new Error('"Callback.method" is not implemented');
  }
}
