export class Timedelta {
  /**
   *
   * @param {number} start - time in seconds
   * @param {number} end - time in seconds
   */
  constructor(start, end) {
    /**
     * @property {number} start - start time in seconds
     */
    this.start = start;
    /**
     * @property {number} end - end time in seconds
     */
    this.end = end;
    /**
     * @property {number} delta - time delta in seconds
     */
    this.delta = end - start;
  }

  /**
   *
   * @returns {string} [XXh ][XXm ][XXs] time delta representation
   */
  toString() {
    let delta = this.delta;
    const seconds = delta % 60;
    delta = Math.floor(delta / 60);
    const minutes = delta % 60;
    delta = Math.floor(delta / 60);
    const hours = delta % 60;

    return `${hours ? `${hours}h ` : ""}${minutes ? `${minutes}m ` : ""}${
      seconds ? `${seconds}s` : ""
    }`.trim();
  }

  static getTimestamp() {
    return Math.floor(Date.now() / 1000);
  }
}
