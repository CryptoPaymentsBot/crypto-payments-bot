/**
 *
 * @param {object} obj
 * @returns
 */
export const filterNull = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null),
  );
