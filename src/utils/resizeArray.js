/**
 *
 *
 * @param  {Array<T>}  arr
 * @param {number} columns
 * @param {(element: T) => B} [map]
 * @template T, B
 * @returns {B[][]}
 */
export const resizeArray = (
  arr,
  columns,
  map = (/** @type {any} */ element) => element,
) =>
  arr.reduce((prev, element, index) => {
    const i = parseInt(`${index / columns}`);
    const j = index % columns;
    // ts wants to fix a feature
    // @ts-ignore
    if (!prev[i]) prev[i] = [];
    // @ts-ignore
    prev[i][j] = map(element);
    return prev;
  }, []);
