import LessonModel from '../../Context/Lessons/infraestructure/LessonModel';

process.env.TZ = 'Europe/London';

function getDayLessons(date: Date) {
  const day = date.getDay();
  if (day === 1 || day === 3) {
    const startDate1 = new Date(date);
    startDate1.setHours(9, 30, 0);
    const endDate1 = new Date(date);
    endDate1.setHours(10, 30, 0);

    const startDate2 = new Date(date);
    startDate2.setHours(10, 30, 0);
    const endDate2 = new Date(date);
    endDate2.setHours(11, 30, 0);

    return [
      new LessonModel({ startDate: startDate1, endDate: endDate1, type: 'mixto' }),
      new LessonModel({ startDate: startDate2, endDate: endDate2, type: 'principiante' }),
    ];
  }

  if (day === 2 || day === 4) {
    const startDate1 = new Date(date);
    startDate1.setHours(19, 0, 0);
    const endDate1 = new Date(date);
    endDate1.setHours(20, 30, 0);

    const startDate2 = new Date(date);
    startDate2.setHours(20, 30, 0);
    const endDate2 = new Date(date);
    endDate2.setHours(21, 30, 0);

    return [
      new LessonModel({ startDate: startDate1, endDate: endDate1, type: 'no-gi' }),
      new LessonModel({ startDate: startDate2, endDate: endDate2, type: 'principiante' }),
    ];
  }

  if (day === 5) {
    const startDate1 = new Date(date);
    startDate1.setHours(10, 0, 0);
    const endDate1 = new Date(date);
    endDate1.setHours(11, 30, 0);

    return [new LessonModel({ startDate: startDate1, endDate: endDate1, type: 'open-mat' })];
  }

  return [];
}

async function main() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const lessons: LessonModel[] = [];
  for (let i = 0; i < 7; i += 1) {
    date.setDate(date.getDate() + 1);
    lessons.push(...getDayLessons(date));
  }
  await LessonModel.bulkCreate(lessons.map((lesson) => lesson.dataValues));
  console.log(`${lessons.length} lessons created`);
  process.exit();
}

main();
