export class Token {
  /**
   *
   * @param {Object} params
   * @param {String} params.nativeChain
   * @param {String} params.name
   * @param {String} params.symbol
   * @param {String} [params.contractAddress]
   * @param {Record<'coingecko',String>} params.externalIds
   * @param {String} params.iconEmoji,
   * @param {Number} params.decimals
   *
   */
  constructor({
    name,
    nativeChain,
    decimals,
    symbol,
    contractAddress,
    externalIds,
    iconEmoji,
  }) {
    /**
     * @type {String}
     */
    this.name = name;
    /**
     * @type {String}
     */
    this.nativeChain = nativeChain;
    /**
     * @type {Number}
     */
    this.decimals = decimals;
    /**
     * @type {String}
     */
    this.symbol = symbol;
    /**
     * @type {String | undefined}
     */
    this.contractAddress = contractAddress;
    /**
     * @type {Record<'coingecko',String>}
     */
    this.externalIds = externalIds;
    /**
     * @type {String}
     */
    this.iconEmoji = iconEmoji;
  }

  toString() {
    return `${this.iconEmoji}${this.name} (${this.symbol}) ${
      this.contractAddress
        ? `on ${this.nativeChain}:${this.contractAddress}`
        : ""
    }`;
  }

  toShortString() {
    return `${this.iconEmoji}${this.symbol}`;
  }

  toHTML() {
    return `<b>${this.iconEmoji}${this.name}<b> <i>(${this.symbol})</i> ${
      this.contractAddress
        ? `on <code>${this.nativeChain}:${this.contractAddress}</code>`
        : ""
    }`;
  }
}
