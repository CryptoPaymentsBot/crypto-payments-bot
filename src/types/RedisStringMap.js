import { logger } from "../../src/logger.js";
import { redisClient } from "../../src/repositories/Redis.js";

export class RedisStringMap {
  static defaultOptions = Object.freeze({
    warnDuplicates: true,
  });
  static _maps = {};
  /**
   *
   * @param {string} name
   * @param {Object} [options]
   * @param {boolean} [options.warnDuplicates=true]
   * @param {import("redis").ClientOpts} [options.redisOptions]
   */
  constructor(name, options = RedisStringMap.defaultOptions) {
    if (typeof name !== "string") throw new Error('"name" must be a string');
    const { warnDuplicates } = options;
    this.name = name;
    this.client = redisClient;

    if (RedisStringMap._maps[name] && warnDuplicates) logger.warn(`RedisMap`);
    RedisStringMap._maps[name] = true;
  }

  /**
   *
   * @param {string} key
   * @returns {string}
   */
  _buildKey(key) {
    return `${this.name}_${key}`;
  }

  /**
   *
   * @param {string} key
   * @returns {Promise<string | undefined>}
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
   * @param {string} key
   * @param {string} value
   * @returns {Promise<string | undefined>}
   */
  set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(this._buildKey(key), value, (err, reply) => {
        if (err) return reject(err);
        resolve(reply?.toString());
      });
    });
  }

  /**
   *
   * @param {string} key
   * @param {number} ttl
   * @param {string} value
   * @returns {Promise<string | undefined>}
   */
  setex(key, ttl, value) {
    return new Promise((resolve, reject) => {
      this.client.setex(this._buildKey(key), ttl, value, (err, reply) => {
        if (err) return reject(err);
        resolve(reply?.toString());
      });
    });
  }
}
