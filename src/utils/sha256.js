import { createHash } from "crypto";

/**
 * SHA256 of text
 * @param {string} text
 * @returns
 */
export const sha256 = (text) => createHash("sha256").update(text).digest("hex");
