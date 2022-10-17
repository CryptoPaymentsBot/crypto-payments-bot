export class Currency {
  /**
   *
   * @param {object} param
   * @param {string} param.code currency code (USD/UAH)
   * @param {string} param.name name of currency (US Dollar)
   * @param {string} param.namePlural name in plural form (US dollars)
   * @param {string} param.symbol symbol of currency ($/CA$)
   * @param {number} param.decimals decimals precision of currency
   */
  constructor({ code, name, namePlural, symbol, decimals }) {
    /**
     * @type {string}  currency code (USD/UAH)
     */
    this.code = code;
    /**
     * @type {string} name in plural form (US dollars)
     */
    this.namePlural = namePlural;
    /**
     * @type {string} symbol of currency ($/CA$)
     */
    this.symbol = symbol;
    /**
     * @type {string}  name of currency (US Dollar)
     */
    this.name = name;
    /**
     * @type {number} decimals precision of currency
     */
    this.decimals = decimals;
  }

  toString() {
    return `${this.name} ${this.symbol}`;
  }
}
