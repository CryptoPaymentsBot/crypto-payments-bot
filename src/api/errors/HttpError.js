export class HttpError extends Error {
  /**
   *
   * @param {Number} statusCode
   * @param {String} message
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
