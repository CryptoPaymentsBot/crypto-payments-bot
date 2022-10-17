import { Token } from "../models/Token.js";

export class TokenAdapter {
  /**
   *
   * @param {Token} token
   */
  constructor(token) {
    this.text = token.toShortString();
  }
}
