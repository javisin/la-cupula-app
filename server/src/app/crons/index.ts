import resetManualSubscriptionsCron from './resetManualSubscriptionsCron';
import generateWeekLessonsCron from './generateWeekLessonsCron';

export default class CronJobRunner {
  cronJobs = [resetManualSubscriptionsCron, generateWeekLessonsCron];

  start() {
    this.cronJobs.forEach((job) => job.start());
  }
}
