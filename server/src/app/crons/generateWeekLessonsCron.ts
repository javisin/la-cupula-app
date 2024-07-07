import { CronJob } from 'cron';
import { LessonModel } from '../../Context/Lessons/infraestructure/LessonModel';

process.env.TZ = 'Europe/London';

interface LessonTime {
  hours: number;
  minutes: number;
}

function generateLessonByTime(date: Date, start: LessonTime, end: LessonTime, type: string) {
  const startDate = new Date(date);
  startDate.setHours(start.hours, start.minutes, 0);
  const endDate = new Date(date);
  endDate.setHours(end.hours, end.minutes, 0);
  return new LessonModel({ startDate, endDate, type });
}

function getDayLessons(date: Date) {
  const day = date.getDay();
  if (day === 1) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 0 },
        { hours: 11, minutes: 30 },
        'Jiu Jitsu',
      ),
      generateLessonByTime(
        date,
        { hours: 11, minutes: 30 },
        { hours: 12, minutes: 30 },
        'Juveniles',
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 30 },
        'Jiu Jitsu',
      ),
      generateLessonByTime(
        date,
        { hours: 20, minutes: 30 },
        { hours: 21, minutes: 30 },
        'Jiu Jitsu - Principiantes',
      ),
    ];
  }

  if (day === 2) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 0 },
        { hours: 11, minutes: 30 },
        'Jiu Jitsu',
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 30 },
        'Grappling',
      ),
    ];
  }

  if (day === 3) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 0 },
        { hours: 11, minutes: 30 },
        'Grappling',
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 30 },
        'Jiu Jitsu',
      ),
      generateLessonByTime(
        date,
        { hours: 20, minutes: 30 },
        { hours: 21, minutes: 30 },
        'Jiu Jitsu - Principiantes',
      ),
    ];
  }

  if (day === 4) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 0 },
        { hours: 11, minutes: 30 },
        'Jiu Jitsu',
      ),
      generateLessonByTime(
        date,
        { hours: 11, minutes: 30 },
        { hours: 12, minutes: 30 },
        'Juveniles',
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 30 },
        'Grappling',
      ),
    ];
  }

  if (day === 5) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 0 },
        { hours: 11, minutes: 30 },
        'Jiu Jitsu',
      ),
    ];
  }

  return [];
}

async function generateWeekLessons() {
  const date = new Date();
  const lessons: LessonModel[] = [];
  for (let i = 0; i < 7; i += 1) {
    date.setDate(date.getDate() + 1);
    lessons.push(...getDayLessons(date));
  }
  await LessonModel.bulkCreate(lessons.map((lesson) => lesson.dataValues));
}

export default new CronJob('0 0 16 * * 6', generateWeekLessons, null, false, 'Europe/London');
