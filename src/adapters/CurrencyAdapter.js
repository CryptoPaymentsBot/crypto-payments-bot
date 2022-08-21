import { Currency } from "../models/currency.js";

export class CurrencyAdapter {
  /**
   *
   * @param {Currency} currency
   */
  constructor(currency) {
    this.text = currency.toString();
  }
}
