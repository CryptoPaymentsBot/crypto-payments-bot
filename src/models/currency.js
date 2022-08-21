export class Currency {
  /**
   *
   * @param {object} param
   * @param {string} param.code
   * @param {string} param.name
   * @param {string} param.namePlural
   * @param {string} param.symbol
   * @param {number} param.decimals
   */
  constructor({ code, name, namePlural, symbol, decimals }) {
    /**
     * @type {string}
     */
    this.code = code;
    /**
     * @type {string}
     */
    this.namePlural = namePlural;
    /**
     * @type {string}
     */
    this.symbol = symbol;
    /**
     * @type {string}
     */
    this.name = name;
    /**
     * @type {number}
     */
    this.decimals = decimals;
  }

  toString() {
    return this.name;
  }
}
