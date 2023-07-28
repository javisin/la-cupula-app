import asyncHandler from 'express-async-handler';
import Booking from '../database/models/booking';
import User from '../database/models/user';
import Lesson from '../database/models/lesson';
import { Op } from 'sequelize';

const index = asyncHandler(async (req, res) => {
  const { date, userId } = req.query;

  const query: { userId?: string } = {};
  if (userId) {
    query.userId = userId as string;
  }

  const lessonQuery: { startDate?: { [Op.gt]: Date; [Op.lt]: Date } } = {};
  if (date) {
    const startDate = new Date(date as string);
    const nextDayDate = new Date(startDate);
    nextDayDate.setDate(startDate.getDate() + 1);
    lessonQuery.startDate = {
      [Op.gt]: startDate,
      [Op.lt]: nextDayDate,
    };
  }

  console.log(lessonQuery);
  const bookings = await Booking.findAll({
    include: [
      { model: User, as: 'user' },
      {
        model: Lesson,
        as: 'lesson',
        where: lessonQuery,
      },
    ],
    where: query,
  });
  res.status(200).json(bookings);
});

const create = asyncHandler(async (req, res) => {
  const { userId, lessonId } = req.body;
  const booking = await Booking.create({ userId, lessonId });
  res.status(200).json(booking);
});
export { create, index };
