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
  if (day === 1) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'Todos los niveles',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'Juveniles',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 30 },
        'Grappling',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 30 },
        { hours: 20, minutes: 30 },
        'Clase de estudio',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 20, minutes: 30 },
        { hours: 21, minutes: 30 },
        'Principiantes',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 12, minutes: 0 },
        { hours: 13, minutes: 0 },
        'Todos los niveles',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'Entreno libre',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'Principiantes',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 0 },
        'Todos los niveles',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 20, minutes: 0 },
        { hours: 21, minutes: 0 },
        'Grappling',
        2,
        62,
      ),
    ];
  }

  if (day === 3) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'Todos los niveles',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'Juveniles',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 30 },
        'Grappling',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 30 },
        { hours: 20, minutes: 30 },
        'Entreno libre',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 20, minutes: 30 },
        { hours: 21, minutes: 30 },
        'Principiantes',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 12, minutes: 0 },
        { hours: 13, minutes: 0 },
        'Todos los niveles',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'Clase de estudio',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'Principiantes',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 0 },
        'Todos los niveles',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 20, minutes: 0 },
        { hours: 21, minutes: 0 },
        'Grappling',
        2,
        62,
      ),
    ];
  }

  if (day === 2 || day === 4) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'Principiantes',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'Sparring',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'Principiantes',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 30 },
        { hours: 20, minutes: 30 },
        'Todos los niveles',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 20, minutes: 30 },
        { hours: 21, minutes: 30 },
        'Grappling',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 9, minutes: 0 },
        { hours: 10, minutes: 0 },
        'Principiantes',
        2,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'Infantiles',
        2,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'Todos los niveles',
        2,
      ),
      generateLessonByTime(
        date,
        { hours: 19, minutes: 0 },
        { hours: 20, minutes: 0 },
        'Principiantes',
        2,
      ),
      generateLessonByTime(
        date,
        { hours: 20, minutes: 0 },
        { hours: 21, minutes: 0 },
        'Juveniles',
        2,
      ),
    ];
  }

  if (day === 5) {
    return [
      generateLessonByTime(
        date,
        { hours: 10, minutes: 30 },
        { hours: 11, minutes: 30 },
        'Todos los niveles',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'Juveniles',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 30 },
        'Todos los niveles',
        1,
      ),
      generateLessonByTime(
        date,
        { hours: 12, minutes: 0 },
        { hours: 13, minutes: 0 },
        'Todos los niveles',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 17, minutes: 0 },
        { hours: 18, minutes: 0 },
        'Principiantes',
        2,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 18, minutes: 0 },
        { hours: 19, minutes: 0 },
        'Grappling',
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
        'Jiu Jitsu - Todos los niveles',
        1,
        62,
      ),
      generateLessonByTime(
        date,
        { hours: 9, minutes: 0 },
        { hours: 10, minutes: 30 },
        'Jiu Jitsu - Todos los niveles',
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
