export const STRING_START_INDEX = 0;
export const BOT_COMMAND_TYPE = "bot_command";
export const AT_SIGN = "@";
export const NOT_FOUND_INDEX = -1;
export const SPACE = " ";
export const EMPTY_STRING = "";
export const JSON_EXT = ".json";
export const GIF_EXT = ".gif";
export const DECIMAL_RADIX = 10;
export const MAX_INLINE_RESULTS = 50;
export const KEY_INDEX = 0; // for Object.entries
// Matches "{0}", "{1}" for formatting
export const INSERTION_REGEXP = /\{\d+\}/g;

export const Jobs = Object.freeze({
  BACKUP_UPLOAD: "BACKUP_UPLOAD",
});

export const DEFAULTS = Object.freeze({
  CHANNEL_CAPTION_TEXT: "~~~",
  CHANNEL_PIN_TO_POST: false,
  CHANNEL_TRANSLATE_CAPTIONS: false,
  CHANNEL_OPEN_IN_BOT: true,
  CHANNEL_IS_PREMIUM: false,
  CHANNEL_TOKEN: EMPTY_STRING,
  CHANNEL_TRANSLATED_POSTS_COUNT: 0,

  USER_PREMIUM: 0,
  USER_IS_SUBSCRIBED: false,
  USER_LAST_SUBSCRIPTION_CHECK: 0,
});

/**
 * @type {Object.<string, import('node-telegram-bot-api').ChatAction>}
 */
export const ChatAction = Object.freeze({
  typing: "typing",
  uploadPhoto: "upload_photo",
});

/**
 * @type {Object.<string, import('node-telegram-bot-api').ChatType>}
 */
export const ChatType = Object.freeze({
  private: "private",
  group: "group",
  supergroup: "supergroup",
  channel: "channel",
});

/**
 * @type {Object.<string, import('node-telegram-bot-api').ParseMode>}
 */
export const ParseMode = Object.freeze({
  HTML: "HTML",
  Markdown: "Markdown",
  MarkdownV2: "MarkdownV2",
});

/**
 * @type {Object.<string, import('node-telegram-bot-api').ChatMemberStatus>}
 */
export const ChatMemberStatus = Object.freeze({
  administrator: "administrator",
  creator: "creator",
  kicked: "kicked",
  left: "left",
  member: "member",
  restricted: "restricted",
});

export const HTML_MAP = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
});

export const StartTags = Object.freeze({
  HELP: "help",
  TRANSLATE: "TRANSLATE",
});
