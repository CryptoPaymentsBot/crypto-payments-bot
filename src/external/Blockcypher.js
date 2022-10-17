/**
 * @typedef {"btc" | "ltc" | "doge"} BlockcypherChain
 */

import { queryStringify } from "../utils/queryStringify.js";

/**
 * @type {Record<string, BlockcypherChain>}
 */
export const blockcypherChainsMap = { BTC: "btc", LTC: "ltc", DOGE: "doge" };
export const blockcypherChains = Object.values(blockcypherChainsMap);

export class BlockcypherClient {
  /**
   * @param {string} apiKey
   * @param {string} [baseUrl]
   */
  constructor(apiKey, baseUrl = "https://api.blockcypher.com") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * @param {string} endpoint
   * @param {import('../utils/queryStringify.js').Query} [query]
   * @returns {Promise<any>}
   */
  async _request(endpoint, query = {}) {
    if (!query.token) {
      query.token = this.apiKey;
    }

    const result = await fetch(
      `${this.baseUrl}/${endpoint}?${queryStringify(query)}`,
      {},
    );

    return await result.json();
  }

  /**
   * @typedef BlockcypherOutput
   * @property {string} script
   * @property {string} script_type
   * @property {string} [spent_by]
   * @property {number} value
   * @property {string[]} addresses
   */

  /**
   * @typedef BlockcypherInput
   * @property {string} prev_hash
   * @property {string} script_type
   * @property {number} output_index
   * @property {number} output_value
   * @property {number} sequence
   * @property {number} age
   * @property {string[]} addresses
   * @property {string[]} witness
   */

  /**
   * @typedef BlockcypherTransaction
   * @property {string} block_hash
   * @property {string} hash
   * @property {string} preference
   * @property {string} relayed_by
   * @property {string} confirmed
   * @property {string} received
   * @property {number} block_height
   * @property {number} block_index
   * @property {number} total
   * @property {number} fees
   * @property {number} size
   * @property {number} vsize
   * @property {number} ver
   * @property {number} vin_sz
   * @property {number} vout_sz
   * @property {number} confirmations
   * @property {number} confidence
   * @property {boolean} double_spend
   * @property {string[]} addresses
   * @property {BlockcypherInput[]} inputs
   * @property {BlockcypherOutput[]} outputs
   */

  /**
   * @typedef BlockcypherResponse
   * @property {string} address
   * @property {number} total_received
   * @property {number} total_sent
   * @property {number} balance
   * @property {number} unconfirmed_balance
   * @property {number} final_balance
   * @property {number} n_tx
   * @property {number} unconfirmed_tx
   * @property {number} final_tx
   * @property {BlockcypherTransaction[]} txs
   */

  /**
   *
   * @param {string} address
   * @param {BlockcypherChain} chain
   * @returns {Promise<BlockcypherResponse>}
   */
  async getFullInfo(address, chain) {
    return this._request(`v1/${chain}/main/addrs/${address}/full`, {
      limit: 500,
    });
  }
}
