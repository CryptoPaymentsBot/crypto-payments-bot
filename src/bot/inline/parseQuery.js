export const QueryMode = {
  EDIT: 0,
  PUBLIC: 1,
};

/**
 * @type {[string, number][]}
 */
const modes = Object.entries(QueryMode).map(([mode, modeValue]) => [
  `${mode.toLowerCase()}:`,
  modeValue,
]);

/**
 *
 * @param {string} query
 */
export const parseQuery = (query) => {
  const queryToCompare = query.toLowerCase();
  for (const [prefix, modeValue] of modes) {
    if (queryToCompare.startsWith(prefix)) {
      return { query: query.substring(prefix.length).trim(), mode: modeValue };
    }
  }

  return { query: query.trim(), mode: -1 };
};
