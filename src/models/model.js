/**
 * @typedef ValidationRule
 * @property {string} name
 * @property {"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"} [type]
 * @property {boolean} [required]
 * @property {(value: any) => string} [validator]
 *
 */

export class Model {
  _tracking = false;
  /**
   * Autoupdating model
   * You should add this._tracking = true to the end of you constructor to start tracking of updates
   *
   * @param {*} param
   * @returns
   */
  constructor({ _id, createdAt, updatedAt }) {
    if (_id) this._id = _id;

    this.createdAt = createdAt ?? Date.now();
    this.updatedAt = updatedAt ?? Date.now();

    return new Proxy(this, {
      set: (target, path, value, receiver) => {
        if (
          path !== "updatedAt" &&
          this._tracking &&
          !(typeof path === "string" && path.startsWith("_"))
        ) {
          this.updatedAt = Date.now();
        }
        return Reflect.set(target, path, value, receiver);
      },
    });
  }

  /**
   *
   * @param {ValidationRule[]} fields Array of fields
   */
  validate(fields) {
    for (const field of fields) {
      const { name, type, validator, required } = field;
      const fieldValue = this[name];
      if (required && (fieldValue === undefined || fieldValue === null)) {
        throw new Error(
          `"${name}" field required for ${this.constructor.name}`
        );
      }
      const fieldType = typeof fieldValue;
      if (type && fieldType !== type) {
        throw new Error(
          `"${name}" has invalid type for ${this.constructor.name}, expected ${type}, but got ${fieldType}`
        );
      }
      if (validator) {
        const validationMessage = validator(fieldValue);

        if (validationMessage) {
          throw new Error(
            `"${name}" validation error for ${this.constructor.name}: ${validationMessage}`
          );
        }
      }
    }
  }
}
