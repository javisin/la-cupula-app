import User from '../database/models/user';
import asyncHandler from 'express-async-handler';
import Lesson from '../database/models/lesson';
import { AuthorizedRequest } from '../jwt';

const index = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: [
      'id',
      'firstName',
      'lastName',
      'belt',
      'stripes',
      'nickName',
      'image',
      'startDate',
    ],
  });
  res.status(200).json({ data: users });
});

const get = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: user });
});

const bookLesson = asyncHandler(async (req: AuthorizedRequest, res) => {
  if (req.params.userId !== req.user?.sub) {
    res.status(403).send('User forbidden ');
    return;
  }
  const user = await User.findOne({ where: { id: req.params.userId } });
  const lesson = await Lesson.findOne({ where: { id: req.params.lessonId } });
  await lesson!.addUser(user!);
  res.json(user);
});

const indexLessons = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.userId },
    include: [
      {
        model: Lesson,
        attributes: ['id', 'type', 'date'],
        as: 'lessons',
      },
    ],
  });

  res.json(user);
});

export { index, get, bookLesson, indexLessons };
