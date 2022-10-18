export const RequestType = Object.freeze({
  contact: "contact",
  location: "location",
  comment: "comment",
});

/**
 * @typedef {keyof typeof RequestType} RequestTypeEnum
 */

/**
 * @typedef ResponseOption
 * @property {RequestTypeEnum} type
 * @property {string} comment
 */
