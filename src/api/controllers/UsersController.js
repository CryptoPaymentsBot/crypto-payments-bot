import { IETFTags } from "../../constants.js";
import { Model } from "../../models/Model.js";
import { UsersService } from "../../services/UsersService.js";
import { HttpError } from "../errors/HttpError.js";
import { errors } from "../schemas/errors.js";
import { userSchema } from "../schemas/user.js";

/**
 * @typedef {object} GetUserParams
 * @property {number} telegramId
 */

/**
 * @typedef {object} CreateUserBody
 * @property {number} telegramId
 * @property {string} name
 * @property {string} locale
 */

export class UsersController {
  /**
   *
   * @param {UsersService} userService
   */
  constructor(userService) {
    this.userService = userService;
  }

  path = "/user";

  /**
   * @type {import('./defaultRouteOptions.js').DefaultRouteOptions<{Params: GetUserParams}>}
   */
  getUser = {
    method: "GET",
    url: `${this.path}/:telegramId`,
    schema: {
      tags: ["Users"],
      params: {
        type: "object",
        properties: {
          telegramId: {
            type: "number",
          },
        },
        required: ["telegramId"],
      },
      response: {
        200: userSchema,
        404: {
          description: "User not found",
          type: "object",
          properties: {
            statusCode: {
              type: "number",
              example: 404,
            },
            error: { type: "string", example: "User not found" },
            message: { type: "string", example: "User not found" },
          },
        },
        ...errors,
      },
    },
    handler: async (request) => {
      const user = await this.userService.find(request.params);
      if (!user) throw new HttpError(404, "User not found");
      return Model.removeRelations(user);
    },
  };

  /**
   * @type {import('./defaultRouteOptions.js').DefaultRouteOptions<{Body: CreateUserBody}>}
   */
  createUser = {
    method: "POST",
    url: `${this.path}/`,
    schema: {
      tags: ["Users"],
      body: {
        type: "object",
        properties: {
          telegramId: {
            type: "number",
            description: "Telegram id",
          },
          name: {
            type: "string",
            description: "Telegram first name + last name",
          },
          locale: {
            type: "string",
            enum: IETFTags,
            description: "IETF language tag",
          },
        },
        required: ["telegramId", "name", "locale"],
      },
      response: {
        201: userSchema,
        ...errors,
      },
    },
    handler: async (request) => {
      const { locale, name, telegramId } = request.body;
      const user = await this.userService.find({ telegramId });

      if (user) {
        throw new HttpError(
          400,
          `User this telegram id #id${telegramId} already exists`,
        );
      }

      const newUser = await this.userService.createUser({
        name,
        locale,
        telegramId,
        isConfirmed: false,
      });

      Model.removeRelations(newUser);

      return newUser;
    },
  };
}
