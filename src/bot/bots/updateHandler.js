import { config } from "../../config.js";
import { logger } from "../../logger.js";
import botQueue from "../queues/botQueue.js";

const RATE_LIMITER = config({
  path: "RATE_LIMITER",
  cast: JSON.parse,
});

/**
 * @typedef {Number} Timestamp
 * @typedef {Number} Id
 * @typedef {Number} MessagesCount
 * @typedef {Object.<Timestamp, MessagesCount>} ReqestsTable
 */

/**
 *
 * @param {string} updateType
 * @returns {(data: any) => void}
 */
export const updateHandler = (updateType) => {
  /**
   * Rate limiter store object
   * @type {Object.<Id, ReqestsTable>}
   */
  const rateLimiter = {};

  logger.log(
    `[${updateType}] ${
      RATE_LIMITER[updateType]
        ? `Rate limiter: ${RATE_LIMITER[updateType]}`
        : "No Rate Limiter"
    }`
  );

  return async (data) => {
    if (RATE_LIMITER[updateType]) {
      /**
       * @type {{ id: Id }}
       */
      const { id } = data.chat ?? data.from ?? {};

      if (id) {
        const seconds = Math.ceil(Date.now() / 1000);

        if (!rateLimiter[id]) {
          rateLimiter[id] = {};
        }

        if (!rateLimiter[id][seconds]) {
          rateLimiter[id] = { [seconds]: 0 };
        }

        rateLimiter[id][seconds]++;

        if (rateLimiter[id][seconds] > RATE_LIMITER[updateType]) {
          return;
        }
      }
    }

    try {
      await botQueue.add(updateType, data);
    } catch (err) {
      logger.error(`<[Update Error: ${updateType}]>`, data, err, "</[Update]>");
    }
  };
};
