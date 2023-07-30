import asyncHandler from 'express-async-handler';
import Lesson from '../database/models/lesson';
import { Op } from 'sequelize';

const create = asyncHandler(async (req, res) => {
  const lesson = await Lesson.create({
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
  const { date } = req.query as IndexFilter;
  const whereStatement: { startDate?: { [Op.gt]: Date; [Op.lt]: Date } } = {};
  if (date) {
    const startDate = new Date(date);
    const nextDayDate = new Date(startDate);
    nextDayDate.setDate(startDate.getDate() + 1);
    whereStatement.startDate = {
      [Op.gt]: startDate,
      [Op.lt]: nextDayDate,
    };
  }
  console.log(whereStatement);

  const lessons = await Lesson.findAll({ where: whereStatement });
  res.status(201).json(lessons);
});

export { index, create };
