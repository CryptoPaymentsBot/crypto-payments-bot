import { MongoClient } from "mongodb";

import { config } from "../config.js";

const MONGO_URL = config("MONGO_URL");

export class Mongo {
  /**
   * @type {MongoClient|null}
   */
  static client = null;

  static async connect() {
    this.client = new MongoClient(MONGO_URL);
    await this.client.connect();
  }

  /**
   *
   * @param {String} name
   * @returns {import('mongodb').Collection<any>}
   */
  static collection(name) {
    if (!this.client) throw new Error("Mongo repository should be connected");
    return this.client?.db?.()?.collection?.(name);
  }

  static async close() {
    if (this.client) await this.client.close();
  }
}
