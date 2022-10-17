import { Currency } from "../models/Currency.js";

export class CurrencyAdapter {
  /**
   *
   * @param {Currency} currency
   */
  constructor(currency) {
    this.text = currency.toString();
  }
}
