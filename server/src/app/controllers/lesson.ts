import asyncHandler from 'express-async-handler';
import LessonsGetter from '../../Context/Lessons/application/LessonsGetter';
import PostgresLessonRepository from '../../Context/Lessons/infraestructure/PostgresLessonRepository';
import LessonCreator from '../../Context/Lessons/application/LessonCreator';
import { SequelizeLesson } from '../../Context/Lessons/infraestructure/LessonModel';
import LessonUpdater from '../../Context/Lessons/application/LessonUpdater';

const lessonsRepository = new PostgresLessonRepository();

interface CreateLessonBody {
  type: string;
  startDate: string;
  endDate: string;
  professorId: number;
  academyId: number;
  maxSeats?: number;
}
const create = asyncHandler(async (req, res) => {
  const lessonCreator = new LessonCreator(lessonsRepository);
  const { type, endDate, startDate, professorId, academyId, maxSeats } =
    req.body as CreateLessonBody;
  await lessonCreator.run({ type, startDate, endDate, professorId, academyId, maxSeats });
  res.status(201).json('Lesson created');
});

interface UpdateLessonBody {
  changeset: {
    type: string;
    startDate: string;
    endDate: string;
    professorId: number;
  };
}
const update = asyncHandler(async (req, res) => {
  const lessonUpdater = new LessonUpdater(lessonsRepository);
  const { changeset } = req.body as UpdateLessonBody;
  await lessonUpdater.run({
    id: Number(req.params.id),
    changeset,
  });
  res.status(200).json('Lesson updated');
});

interface IndexFilter {
  date?: string;
  academyId?: string;
}

const index = asyncHandler(async (req, res) => {
  const lessonsGetter = new LessonsGetter(lessonsRepository);
  const query = req.query as IndexFilter;
  const lessons = await lessonsGetter.run({
    ...query,
    academyId: Number(query.academyId),
    date: query.date ? new Date(query.date) : undefined,
  });
  res.status(200).json(lessons);
});

const deleteLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await SequelizeLesson.destroy({
    where: {
      id,
    },
  });
  res.status(200).json('Lesson deleted');
});

export { index, create, deleteLesson, update };
