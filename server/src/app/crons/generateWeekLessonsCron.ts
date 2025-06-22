import { CronJob } from 'cron';
import { SequelizeLesson } from '../../Context/Lessons/infraestructure/LessonModel';

process.env.TZ = 'Europe/London';

const DEFAULT_PROFESSOR_ID = 5;

interface LessonTime {
  hours: number;
  minutes: number;
}

function generateLessonByTime(
  date: Date,
  start: LessonTime,
  end: LessonTime,
  type: string,
  academyId: number,
  professorId = DEFAULT_PROFESSOR_ID,
) {
  const startDate = new Date(date);
  startDate.setHours(start.hours, start.minutes, 0);
  const endDate = new Date(date);
  endDate.setHours(end.hours, end.minutes, 0);
  return new SequelizeLesson({
    startDate,
    endDate,
    type,
    professorId,
    maxSeats: 20,
    bookedSeats: 0,
    academyId,
  });
}

function getDayLessons(date: Date) {
  const day = date.getDay();
  if (day === 1 || day === 3) {
    return [
      generateLessonByTime(
        date,
        { hours: 9, minutes: 30 },
        { hours: 10, minutes: 30 },
        'Juveniles',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'Jiu Jitsu - TLN',
        1,
      ),
      generateLessonByTime(date, { hours: 18, minutes: 0 }, { hours: 19, minutes: 0 }, 'No Gi', 1),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 0 },
        'Jiu Jitsu - TLN',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 9, minutes: 30 },
        { hours: 10, minutes: 30 },
        'Jiu Jitsu - TLN',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'No Gi',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'Jiu Jitsu - Principiantes',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 0 },
        'No Gi',
        2,
        62,
      ),
    ];
  }

  if (day === 2 || day === 4) {
    return [
      generateLessonByTime(
        date,
        { hours: 9, minutes: 30 },
        { hours: 10, minutes: 30 },
        'No Gi',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'Jiu Jitsu - Principiantes',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'Iniciación',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'No Gi',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 0 },
        'Jiu Jitsu - Principiantes',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 9, minutes: 30 },
        { hours: 10, minutes: 30 },
        'Jiu Jitsu - TLN',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'No Gi',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'No Gi',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'Jiu Jitsu - Principiantes',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 0 },
        'No Gi',
        2,
        62,
      ),
    ];
  }

  if (day === 5) {
    return [
      generateLessonByTime(
        date,
        { hours: 9, minutes: 30 },
        { hours: 10, minutes: 30 },
        'Juveniles',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'Jiu Jitsu - TLN',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'Sparring',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 9, minutes: 30 },
        { hours: 10, minutes: 30 },
        'Jiu Jitsu - TLN',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'No Gi',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'Sparring',
        2,
        62,
      ),
    ];
  }

  if (day === 6) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'Jiu Jitsu - TLN',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'Jiu Jitsu - TLN',
        2,
      ),
    ];
  }

  return [];
}

export async function generateWeekLessons() {
  const date = new Date();
  const lessons: SequelizeLesson[] = [];
  for (let i = 0; i < 7; i += 1) {
    date.setDate(date.getDate() + 1);
    lessons.push(...getDayLessons(date));
  }
  await SequelizeLesson.bulkCreate(lessons.map((lesson) => lesson.dataValues));
}

export default new CronJob('0 0 16 * * 6', generateWeekLessons, null, false, 'Europe/London');
