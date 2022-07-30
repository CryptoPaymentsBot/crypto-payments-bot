/**
 * @param {Object} record
 * @returns
 */
export const prepareRecord = (record) =>
  Object.entries(Object.getOwnPropertyDescriptors(record)).reduce(
    (
      preparedRecord,
      [propertyName, { configurable, enumerable, writable, value }]
    ) => {
      // filtering all getters/setters and "private" properties which starts with "_" char
      if (!propertyName.startsWith("_")) {
        if (configurable && enumerable && writable)
          preparedRecord[propertyName] = value;
      }
      return preparedRecord;
    },
    {}
  );
