import { Console } from "console";
import fs from "fs";
import { fileURLToPath } from "node:url";
import path from "path";

import { config } from "./config.js";

const LOGGER_STDOUT = config("LOGGER_STDOUT");
const LOG_UPDATES = config("LOG_UPDATES");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stdout = fs.createWriteStream(path.join(__dirname, "../log/stdout.log"), {
  autoClose: true,
  flags: "a",
});

const updatesOut = fs.createWriteStream(
  path.join(__dirname, "../log/updates_out.log"),
  {
    autoClose: true,
    flags: "a",
  },
);

const stderr = fs.createWriteStream(path.join(__dirname, "../log/stderr.log"), {
  autoClose: true,
  flags: "a",
});

export const logger = {
  console: new Console(stdout, stderr),
  updatesConsole: new Console(updatesOut),
  stdout,
  stderr,
  log() {
    this.console.log("[LOG]", ...arguments);
    if (LOGGER_STDOUT) console.log(...arguments);
  },
  info() {
    return this.log(...arguments);
  },
  debug() {
    return this.log(...arguments);
  },
  warn() {
    this.console.warn("[WARN]", ...arguments);
    if (LOGGER_STDOUT) console.warn(...arguments);
  },
  error() {
    this.console.error("[ERROR]", ...arguments);
    if (LOGGER_STDOUT) console.error(...arguments);
  },
  err() {
    this.error(...arguments);
  },
  fatal() {
    this.error(...arguments);
  },
  trace() {
    this.error(...arguments);
  },
  obj() {
    this.log(...[...arguments].map((obj) => JSON.stringify(obj, null, 2)));
  },
  /**
   *
   * @param {string} updateType
   * @param {Object} update
   */
  update(updateType, update) {
    if (!LOG_UPDATES) return;

    this.updatesConsole.log(
      `<[${updateType}]>\n`,
      JSON.stringify({ [updateType]: update }, null, 2),
      `\n</[${updateType}]>`,
    );
  },
  child() {
    return this;
  },
};
