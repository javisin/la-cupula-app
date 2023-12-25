import asyncHandler from 'express-async-handler';
import LessonsGetter from '../../Context/Lessons/application/LessonsGetter';
import PostgresLessonRepository from '../../Context/Lessons/infraestructure/PostgresLessonRepository';
import LessonCreator from '../../Context/Lessons/application/LessonCreator';
import { LessonModel } from '../../Context/Lessons/infraestructure/LessonModel';

const lessonsRepository = new PostgresLessonRepository();

interface CreateLessonBody {
  type: string;
  startDate: string;
  endDate: string;
}
const create = asyncHandler(async (req, res) => {
  const lessonCreator = new LessonCreator(lessonsRepository);
  const { type, endDate, startDate } = req.body as CreateLessonBody;
  await lessonCreator.run({ type, startDate, endDate });
  res.status(201).json('Lesson created');
});

interface IndexFilter {
  date?: string;
}

const index = asyncHandler(async (req, res) => {
  const lessonsGetter = new LessonsGetter(lessonsRepository);
  const query = req.query as IndexFilter;
  const lessons = await lessonsGetter.run({
    ...query,
    date: query.date ? new Date(query.date) : undefined,
  });
  res.status(200).json(lessons);
});

const deleteLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await LessonModel.destroy({
    where: {
      id,
    },
  });
  res.status(200).json('Lesson deleted');
});

export { index, create, deleteLesson };
