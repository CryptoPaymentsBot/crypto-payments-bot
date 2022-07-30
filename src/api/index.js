import { config } from "../config.js";
import { init } from "../init.js";
import { logger } from "../logger.js";
import { localPlugins } from "./plugins/index.js";
import { server } from "./server.js";

const PORT = config("PORT", "3000");

await init();

server.register(localPlugins);
await server.listen({ port: PORT, host: "0.0.0.0" });
server.swagger();

logger.log(`API is started at ${new Date().toLocaleString()} at ${PORT} port`);
