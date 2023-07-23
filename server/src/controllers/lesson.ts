import asyncHandler from 'express-async-handler';
import Lesson from '../database/models/lesson';

const create = asyncHandler(async (req, res) => {
  const lesson = await Lesson.create({
    type: 'test',
    date: new Date(),
  });
  res.status(201).json({ data: lesson, message: 'Lesson created' });
  return;
});

const index = asyncHandler(async (req, res) => {
  const lessons = await Lesson.findAll();
  res.status(201).json({ data: lessons });
  return;
});

export { index, create };
