import { RedisStringMap } from "../types/RedisStringMap.js";
import { BaseService } from "./BaseService.js";

export class CacheService extends BaseService {
  constructor() {
    super();
    this.map = new RedisStringMap("cache");
  }

  /**
   * @param {string} key
   */
  async get(key) {
    const value = await this.map.get(key);
    if (value === null || value === undefined) return null;
    return JSON.parse(value);
  }

  /**
   *
   * @param {string} key
   * @param {any} value
   * @returns
   */
  set(key, value) {
    return this.map.set(key, JSON.stringify(value));
  }

  /**
   *
   * @param {string} key
   * @param {number} ttl
   * @param {any} value
   * @returns
   */
  setex(key, ttl, value) {
    return this.map.setex(key, ttl, JSON.stringify(value));
  }
}
