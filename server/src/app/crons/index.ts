import resetManualSubscriptionsCron from './resetManualSubscriptionsCron';

export default class CronJobRunner {
  cronJobs = [resetManualSubscriptionsCron];

  start() {
    this.cronJobs.forEach((job) => job.start());
  }
}
