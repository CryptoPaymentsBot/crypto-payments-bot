import { logger } from "../../src/logger.js";
import { redisClient } from "../../src/repositories/Redis.js";

export class RedisStringMap {
  static defaultOptions = Object.freeze({
    warnDupicats: true,
  });
  static _maps = {};
  /**
   *
   * @param {string} name
   * @param {Object} [options]
   * @param {boolean} [options.warnDupicats=true]
   * @param {import("redis").ClientOpts} [options.redisOptions]
   */
  constructor(name, options = RedisStringMap.defaultOptions) {
    if (typeof name !== "string") throw new Error('"name" must be a string');
    const { warnDupicats } = options;
    this.name = name;
    this.client = redisClient;

    if (RedisStringMap._maps[name] && warnDupicats) logger.warn(`RedisMap`);
    RedisStringMap._maps[name] = true;
  }

  /**
   *
   * @param {String} key
   * @returns {String}
   */
  _buildKey(key) {
    return `${this.name}_${key}`;
  }

  /**
   *
   * @param {String} key
   * @returns {Promise<String | undefined>}
   */
  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(this._buildKey(key), (err, reply) => {
        if (err) return reject(err);
        resolve(reply?.toString());
      });
    });
  }

  /**
   *
   * @param {String} key
   * @param {String} value
   * @returns {Promise<String | undefined>}
   */
  set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(this._buildKey(key), value, (err, reply) => {
        if (err) return reject(err);
        resolve(reply?.toString());
      });
    });
  }
}
