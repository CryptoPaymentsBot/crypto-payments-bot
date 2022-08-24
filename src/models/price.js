export class Price {
  /**
   *
   * @param {object} param
   * @param {string} param.currencyCode linked to Currency.code
   * @param {string} param.tokenSymbol linked to Token.symbol
   * @param {number} param.amount price in Currency for one Token
   */
  constructor({ currencyCode, tokenSymbol, amount }) {
    /**
     * @type {string} linked to Currency.code
     */
    this.currencyCode = currencyCode;
    /**
     * @type {string} linked to Token.symbol
     */
    this.tokenSymbol = tokenSymbol;
    /**
     * @type {number} price in Currency for one Token
     */
    this.amount = amount;
  }
}
