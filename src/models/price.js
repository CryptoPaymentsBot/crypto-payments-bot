export class Price {
  /**
   *
   * @param {object} param
   * @param {string} param.currencyCode
   * @param {string} param.tokenSymbol
   * @param {number} param.amount
   */
  constructor({ currencyCode, tokenSymbol, amount }) {
    /**
     * @type {string}
     */
    this.currencyCode = currencyCode;
    /**
     * @type {string}
     */
    this.tokenSymbol = tokenSymbol;
    /**
     * @type {number}
     */
    this.amount = amount;
  }
}
