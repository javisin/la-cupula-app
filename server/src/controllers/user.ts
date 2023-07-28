import User from '../database/models/user';
import asyncHandler from 'express-async-handler';
import Lesson from '../database/models/lesson';

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
  if (user === null) {
    res.status(404).json({ message: 'This user does not exist' });
    return;
  }
  res.status(200).json(user);
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

export { index, get, indexLessons };
