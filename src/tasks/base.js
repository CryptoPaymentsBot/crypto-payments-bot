export class BaseTask {
  /**
   *
   * @param {string[]} apps
   * @param {(import("bull").CronRepeatOptions | import("bull").EveryRepeatOptions) & {runOnStart?: boolean}} repeatOptions
   * @param {import("bull").JobOptions} [jobOptions]
   */
  constructor(apps, repeatOptions, jobOptions = {}) {
    this.apps = apps;
    this.repeatOptions = repeatOptions;
    this.jobOptions = jobOptions;
  }

  /**
   * @param {import("bull").Job} [job]
   */
  async run(job) {
    throw new Error("Not implemented yet");
  }
}
