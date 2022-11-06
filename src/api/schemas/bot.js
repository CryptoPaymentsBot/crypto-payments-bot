export const botSchema = {
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
  },
};
