/**
 * @typedef {Record<string, string | null |number | boolean>} Query
 */

/**
 * @param {Query} query
 */
export const queryStringify = (query) =>
  Object.entries(query)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${key}=${value === null ? null : encodeURIComponent(value)}`,
    )
    .join("&");
