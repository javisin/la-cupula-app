import asyncHandler from 'express-async-handler';
import LessonsGetter from '../../Context/Lessons/application/LessonsGetter';
import PostgresLessonRepository from '../../Context/Lessons/infraestructure/PostgresLessonRepository';
import LessonModel from '../../Context/Lessons/infraestructure/LessonModel';

const create = asyncHandler(async (req, res) => {
  const lesson = await LessonModel.create({
    type: 'test',
    startDate: new Date(),
    endDate: new Date(),
  });
  res.status(201).json({ data: lesson, message: 'Lesson created' });
});

interface IndexFilter {
  date?: string;
}

const index = asyncHandler(async (req, res) => {
  const lessonsRepository = new PostgresLessonRepository();
  const lessonsGetter = new LessonsGetter(lessonsRepository);
  const query = req.query as IndexFilter;
  const lessons = await lessonsGetter.run({
    ...query,
    date: query.date ? new Date(query.date) : undefined,
  });
  res.status(200).json(lessons);
});

export { index, create };
