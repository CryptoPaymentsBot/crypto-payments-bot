/**
 *
 * @param {string} string
 * @returns {RegExp}
 */
export function createEscapedRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }

  return new RegExp(
    string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d"),
    "gmi"
  );
}
