import { fetch } from "undici";

/**
 * @typedef {"eth" | "polygon" | "bsc"} MoralisChain
 */

/**
 * @type {Record<string, MoralisChain>}
 */
export const moralisChainsMap = { ETH: "eth", MATIC: "polygon", BSC: "bsc" };
export const moralisChains = Object.values(moralisChainsMap);

/**
 * @typedef TransactionsResponse
 * @property {number} number
 * @property {number} page
 * @property {number} page_size
 * @property {string | null} cursor
 * @property {T[]} result
 * @template T
 */

export class MoralisClient {
  /**
   *
   * @param {string} apiKey Moralis API key
   * @param {string} [baseUrl]
   */
  constructor(apiKey, baseUrl = "https://deep-index.moralis.io") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * @param {string} endpoint
   * @returns {Promise<any>}
   */
  async _request(endpoint) {
    const result = await fetch(`${this.baseUrl}/${endpoint}`, {
      headers: { "X-API-Key": this.apiKey },
    });
    return await result.json();
  }

  /**
   * @typedef Transaction
   * @property {string} hash
   * @property {string} nonce
   * @property {string} transaction_index
   * @property {string} from_address
   * @property {string} to_address
   * @property {string} value
   * @property {string} gas
   * @property {string} gas_price
   * @property {string} input
   * @property {string} receipt_cumulative_gas_used
   * @property {string} receipt_gas_used
   * @property {string | null} receipt_contract_address
   * @property {string | null} receipt_root
   * @property {string} receipt_status
   * @property {string} block_timestamp
   * @property {string} block_number
   * @property {string} block_hash
   * @property {number[]} transfer_index
   */

  /**
   * @param {string} address
   * @param {MoralisChain} chain
   * @returns {Promise<TransactionsResponse<Transaction>>}
   */
  getTransactions(address, chain) {
    return this._request(`api/v2/${address}?chain=${chain}`);
  }

  /**
   * @typedef TokenTransfers
   * @property {string} transaction_hash
   * @property {string} address contract address
   * @property {string} block_timestamp
   * @property {string} block_number
   * @property {string} block_hash
   * @property {string} to_address
   * @property {string} from_address
   * @property {string} value
   */

  /**
   * @param {string} address
   * @param {MoralisChain} chain
   * @returns {Promise<TransactionsResponse<TokenTransfers>>}
   */
  getTokenTransfers(address, chain) {
    return this._request(`api/v2/${address}/erc20/transfers?chain=${chain}`);
  }

  /**
   * @typedef NativeBalance
   * @property {string} balance
   */

  /**
   * @param {string} address
   * @param {MoralisChain} chain
   * @returns {Promise<NativeBalance>}
   */
  getNativeBalance(address, chain) {
    return this._request(`api/v2/${address}?chain=${chain}`);
  }

  /**
   * @typedef TokenBalance
   * @property {string} token_address
   * @property {string} name
   * @property {string} symbol
   * @property {string | null} logo
   * @property {string | null} thumbnail
   * @property {number} decimals
   * @property {string} balance
   */

  /**
   * @param {string} address
   * @param {MoralisChain} chain
   * @returns {Promise<TokenBalance[]>}
   */
  getTokenBalances(address, chain) {
    return this._request(`api/v2/${address}/erc20?chain=${chain}`);
  }
}
