export class Token {
  /**
   *
   * @param {Object} params
   * @param {String} params.name name of token, ex: Bitcoin
   * @param {String} params.nativeChain symbol of native token
   * @param {String} params.symbol symbol current token
   * @param {String} [params.contractAddress] contract address of token
   * @param {String} params.iconEmoji emoji of token/native token
   * @param {Number} params.decimals decimals precision number
   * @param {Record<'coingecko',String>} params.externalIds map of sources and external ids used for price/other external metadata information
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
     * @type {String} name of token, ex: Bitcoin
     */
    this.name = name;
    /**
     * @type {String} symbol of native token
     */
    this.nativeChain = nativeChain;
    /**
     * @type {Number} decimals precision number
     */
    this.decimals = decimals;
    /**
     * @type {String} symbol current token
     */
    this.symbol = symbol;
    /**
     * @type {String | undefined} contract address of token
     */
    this.contractAddress = contractAddress;
    /**
     * @type {Record<'coingecko',String>} map of sources and external ids used for price/other external metadata information
     */
    this.externalIds = externalIds;
    /**
     * @type {String} emoji of token/native token
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
