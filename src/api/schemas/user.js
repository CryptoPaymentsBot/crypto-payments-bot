import { IETFTags } from "../../constants.js";

export const userSchema = {
  type: "object",
  properties: {
    id: { type: "number", example: 1, description: "DB row ID" },
    telegramId: {
      type: "number",
      example: 295162096,
      description: "Telegram id",
    },
    name: {
      type: "string",
      example: "Arthur Kh",
      description: "Telegram first name + last name",
    },
    locale: {
      type: "string",
      enum: IETFTags,
      example: "ua",
      description: "IETF language tag",
    },
    startTag: {
      type: "string",
      example: null,
      description: "With tag from command /start tag",
    },
    createdAt: {
      type: "string",
      example: new Date(),
      format: "date-time",
      description: "Date when user was created in db",
    },
    isConfirmed: {
      type: "boolean",
      example: true,
      description: "Is user data confirmed on bot side",
    },
  },
};
