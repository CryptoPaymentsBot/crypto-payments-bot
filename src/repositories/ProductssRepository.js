/**
 * @typedef {Product & {_id:import('bson').ObjectId}} ProductDocument
 */

import { logger } from "../logger.js";
import { Product } from "../models/product.js";
import { prepareRecord } from "../utils/prepareRecord.js";

export class ProductsRepository {
  /**
   * @type {import("mongodb").Collection<ProductDocument> | null}
   */
  static collection = null;

  /**
   *
   * @param {import("mongodb").Collection<ProductDocument>} collection
   */
  static async load(collection) {
    this.collection = collection;
    await collection.createIndex("botId");
    logger.log("[REPOSITORY] ProductsRepository loaded");
  }

  /**
   *
   * @param {Number} botId
   * @returns {Promise<Product[]>}
   */
  static async getProducts(botId) {
    if (!this.collection)
      throw new Error("ProductsRepository collections is not loaded");
    const documents = await this.collection.find({ botId }).toArray();

    return documents.map((productDocument) => new Product(productDocument));
  }

  /**
   *
   * @param {Number} id
   * @returns {Promise<Product | null>}
   */
  static async getProduct(id) {
    if (!this.collection)
      throw new Error("ProductsRepository collections is not loaded");
    const doc = await this.collection.findOne({ id });

    return doc && new Product(doc);
  }

  /**
   *
   * @param {Product} product
   */
  static async update(product) {
    if (!this.collection)
      throw new Error("ProductsRepository collections is not loaded");
    const { _id } = product;

    if (_id) {
      return this.collection.updateOne(
        { _id },
        { $set: prepareRecord(product) },
        { upsert: true },
      );
    } else {
      return this.collection.insertOne(product);
    }
  }

  static async count() {
    if (!this.collection)
      throw new Error("ProductsRepository collections is not loaded");
    return this.collection.estimatedDocumentCount({});
  }
}
