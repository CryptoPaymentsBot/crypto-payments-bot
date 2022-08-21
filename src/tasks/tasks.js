import Bull from "bull";

import { config } from "../config.js";
import { Apps } from "../constants.js";
import { logger } from "../logger.js";
import { BaseTask } from "./base.js";
import { PriceTask } from "./priceTask.js";

const BOT_NAME = config("BOT_NAME");
const REDIS_URL = config("REDIS_URL");
const CURRENT_APP = config("APP");

const appQueue = new Bull(`${BOT_NAME}-app-queue`, REDIS_URL, {
  defaultJobOptions: {
    removeOnComplete: true,
  },
});

/**
 * @type {Record<string, BaseTask>}
 */
export const tasks = {
  price: new PriceTask([Apps.BOT], {
    every: 30 * 1000,
    runOnStart: true,
  }),
};

export async function initTasks() {
  const currentAppTasks = Object.fromEntries(
    Object.entries(tasks).filter(([, task]) => task.apps.includes(CURRENT_APP)),
  );

  for (const [taskName, task] of Object.entries(currentAppTasks)) {
    appQueue.process(taskName, async (job) => {
      return task.run(job);
    });
  }

  const repeatableJobs = await appQueue.getRepeatableJobs();

  /**
   * @type {Record<string, import('bull').JobInformation>}
   */
  const repeatableJobsMap = Object.fromEntries(
    repeatableJobs.map((job) => [job.id, job]),
  );

  logger.log(
    `[tasks] currentrly running tasks ${JSON.stringify(
      Object.keys(repeatableJobsMap),
    )}`,
  );

  for (const [taskName, task] of Object.entries(currentAppTasks)) {
    const { id, cron, every } =
      repeatableJobsMap[taskName] ??
      (await appQueue.add(
        taskName,
        {},
        {
          ...(task.jobOptions ?? {}),
          jobId: taskName,
          repeat: task.repeatOptions,
        },
      ));

    logger.log(
      `[tasks] ${taskName} is ${
        id ? "already running" : "started"
      } with repeat options: ${JSON.stringify({ cron, every }, null, 2)}`,
    );
  }

  for (const [taskName, job] of Object.entries(repeatableJobsMap)) {
    const task = tasks[taskName];
    if (!task) {
      await appQueue.removeRepeatableByKey(job.key);
      logger.log(`[tasks] ${taskName} stopped`);
    }
  }
}

export default appQueue;
