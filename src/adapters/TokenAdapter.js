import { Token } from "../models/token.js";

export class TokenAdapter {
  /**
   *
   * @param {Token} token
   */
  constructor(token) {
    this.text = token.toShortString();
  }
}
