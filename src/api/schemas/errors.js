export const errors = {
  400: {
    description: "Bad request error format",
    type: "object",
    properties: {
      statusCode: {
        type: "number",
        example: 400,
      },
      error: { type: "string", example: "Bad Request" },
      message: { type: "string", example: "Something passed wrong" },
    },
  },
  403: {
    description: "Forbidden error format",
    type: "object",
    properties: {
      statusCode: {
        type: "number",
        example: 403,
      },
      error: { type: "string", example: "Forbidden" },
      message: {
        type: "string",
        example: "Rate limit exceeded, retry in 1 minute",
      },
    },
  },
  429: {
    description: "Too Many Requests error format",
    type: "object",
    properties: {
      statusCode: {
        type: "number",
        example: 429,
      },
      error: { type: "string", example: "Too Many Requests" },
      message: {
        type: "string",
        example: "Rate limit exceeded, retry in 1 minute",
      },
    },
  },
  500: {
    description: "Internal Server error format",
    type: "object",
    properties: {
      statusCode: {
        type: "number",
        example: 500,
      },
      error: { type: "string", example: "Internal Server Error" },
      message: {
        type: "string",
        example: "Something went wrong",
      },
    },
  },
};
