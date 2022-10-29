import { config as defaultConfig, makeConfig } from "@masterarthur/config";
import fsp from "fs/promises";

async function getConfig() {
  try {
    return await makeConfig("config.env");
  } catch (err) {
    return defaultConfig;
  }
}
const packageData = await fsp.readFile("./package.json");

export const packageMetadata = JSON.parse(packageData.toString());
export const config = await getConfig();
