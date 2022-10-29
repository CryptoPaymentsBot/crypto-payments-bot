import { prepareRecord } from "../utils/prepareRecord.js";

export class Model {
  /**
   * @type {string[]}
   */
  _relations = [];

  /**
   * Don't use this method with models which will be reused
   * @param {Partial<Model>} model copy of model which should be filtered from relation fields
   */
  static removeRelations(model) {
    model?._relations?.forEach((relation) => delete model[relation]);
    delete model._relations;
  }

  toJSON() {
    return prepareRecord(this);
  }
}
