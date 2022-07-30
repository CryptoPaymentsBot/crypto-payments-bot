import fs from "fs";
import { fileURLToPath } from "node:url";
import path from "path";

import { config } from "../../src/config.js";
import {
  DECIMAL_RADIX,
  INSERTION_REGEXP,
  JSON_EXT,
  KEY_INDEX,
} from "../../src/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DEFAULT_LOCALE = config("DEFAULT_LOCALE");

export const locales = fs
  .readdirSync(__dirname)
  .filter((fileName) => path.extname(fileName) === JSON_EXT)
  .reduce((acc, locale) => {
    acc[path.basename(locale, JSON_EXT)] = JSON.parse(
      fs.readFileSync(path.join(__dirname, locale), "utf-8"),
    );

    return acc;
  }, {});

/**
 *
 * @param {string} locale
 * @returns {(keys: TemplateStringsArray | String[], ...substitutions: any[]) => string}
 */
export function t18g(locale) {
  return (keys, ...substitutions) => {
    const key = keys
      .filter((key) => !!key.trim())
      .join("")
      .trim();

    /**
     * @type {string}
     */
    const text = locales?.[locale]?.[key] ?? locales?.[DEFAULT_LOCALE]?.[key];

    if (!text) return `{${key}}`;

    const insertionsMatch = text.match(INSERTION_REGEXP);

    if (!(insertionsMatch && substitutions.length)) return text;

    const insertions = insertionsMatch.map((insertion) => ({
      index: parseInt(insertion.substring(1, insertion.length), DECIMAL_RADIX),
      insertion,
    }));

    return insertions.reduce(
      (oldText, { insertion, index }) =>
        oldText.replace(insertion, substitutions[index]),
      text,
    );
  };
}

/**
 *
 * @param {String} locale
 * @param {string | null | undefined} text
 * @returns {String | undefined}
 */
export const getKey = (locale, text) => {
  if (!text) return undefined;

  const key = (Object.entries(
    locales?.[locale] ?? locales?.[DEFAULT_LOCALE],
  ).find(([, value]) => value === text) ||
    Object.entries(locales?.[DEFAULT_LOCALE]).find(
      ([, value]) => value === text,
    ))?.[KEY_INDEX];

  if (key) return key;

  if (text.startsWith("{") && text.endsWith("}")) {
    return text.substring(1, text.length - 1);
  }
};

export const localesNames = Object.keys(locales);
