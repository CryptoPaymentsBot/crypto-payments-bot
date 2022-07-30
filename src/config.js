import { config as defaultConfig, makeConfig } from "@masterarthur/config";

async function getConfig() {
  try {
    return await makeConfig("config.env");
  } catch (err) {
    return defaultConfig;
  }
}

export const config = await getConfig();
