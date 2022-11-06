import { randomBytes } from "crypto";

import { BotsRepository } from "../repositories/BotsRepository.js";
import { sha256 } from "../utils/sha256.js";
import { BaseService } from "./BaseService.js";

export class AuthService extends BaseService {
  API_KEY_LENGTH = 32;

  generateBotApiKey() {
    return randomBytes(this.API_KEY_LENGTH).toString("hex");
  }

  /**
   *
   * @param {string} apiKey
   */
  preValidateApiKey(apiKey) {
    return (
      apiKey.length === this.API_KEY_LENGTH && !!apiKey.match(/^[0-9a-fA-F]+$/)
    );
  }

  /**
   *
   * @param {object} param
   * @param {string} param.apiKey
   */
  async findByApiKey({ apiKey }) {
    const bot = await BotsRepository.getBot({ apiKeyHash: sha256(apiKey) });

    return bot;
  }
}
