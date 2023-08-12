import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import User from '../../database/models/user';
import Lesson from '../../database/models/lesson';
import BookingModel from '../../Context/Bookings/infraestructure/BookingModel';
import BookingCreator from '../../Context/Bookings/application/BookingCreator';
import PostgresBookingRepository from '../../Context/Bookings/infraestructure/PostgresBookingRepository';

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

  const bookings = await BookingModel.findAll({
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
  const repository = new PostgresBookingRepository();
  const bookingCreator = new BookingCreator(repository);
  await bookingCreator.run({ userId, lessonId });
  res.status(201).send();
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await BookingModel.destroy({
    where: {
      id,
    },
  });
  res.status(200).json('Booking deleted');
});

const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const booking = await BookingModel.findOne({
    where: {
      id,
    },
  });

  if (!booking) {
    res.status(404).json('Booking not found');
    return;
  }

  booking.status = status;
  res.status(200).json(booking);
});
export { create, index, deleteBooking, updateBooking };
