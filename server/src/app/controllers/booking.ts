import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import { BookingModel } from '../../Context/Bookings/infraestructure/BookingModel';
import BookingCreator from '../../Context/Bookings/application/BookingCreator';
import PostgresBookingRepository from '../../Context/Bookings/infraestructure/PostgresBookingRepository';
import { SequelizeLesson } from '../../Context/Lessons/infraestructure/LessonModel';
import BookingUpdater from '../../Context/Bookings/application/BookingUpdater';
import PostgresUserRepository from '../../Context/Users/infraestructure/PostgresUserRepository';
import UserFinder from '../../Context/Users/application/UserFinder';
import UserNotFoundError from '../../Context/Users/domain/UserNotFoundError';
import UnauthorizedUserError from '../../Context/Users/domain/UnauthorizedUserError';
import UserPlanBookingsIncrementer from '../../Context/Users/application/UserPlanBookingsIncrementer';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';
import PostgresPlanRepository from '../../Context/Plans/infraestructure/PostgresPlanRepository';
import PlanFinder from '../../Context/Plans/application/PlansFinder';
import { InMemoryAsyncEventBus } from '../../Context/Shared/infraestructure/InMemoryEventBus';
import { IncrementCoursesCounterOnCourseCreated } from '../../Context/Users/application/IncrementPlanBookingsOnBookingApproved';

const userRepository = new PostgresUserRepository();
const userFinder = new UserFinder(userRepository);
const planRepository = new PostgresPlanRepository();
const planFinder = new PlanFinder(planRepository);
const userPlanBookingsIncrementer = new UserPlanBookingsIncrementer(
  userRepository,
  userFinder,
  planFinder,
);
const eventBus = new InMemoryAsyncEventBus();
const userPlanBookingsSubscriber = new IncrementCoursesCounterOnCourseCreated(
  userPlanBookingsIncrementer,
);
eventBus.addSubscribers([userPlanBookingsSubscriber]);

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
      { model: SequelizeUser, as: 'user' },
      {
        model: SequelizeLesson,
        as: 'lesson',
        where: lessonQuery,
      },
    ],
    where: query,
  });
  res.status(200).json(bookings);
});

const create = asyncHandler(async (req, res) => {
  const { userId, lessonId, status } = req.body;
  const repository = new PostgresBookingRepository();
  const bookingCreator = new BookingCreator(repository, userFinder, planFinder);
  try {
    await bookingCreator.run({ userId, lessonId, status });
  } catch (e) {
    if (e instanceof UserNotFoundError) {
      res.status(404).send('User does not exist');
      return;
    }
    if (e instanceof UnauthorizedUserError) {
      res.status(403).send(e.message);
      return;
    }
    throw e;
  }
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

  const repository = new PostgresBookingRepository();
  const bookingUpdater = new BookingUpdater(repository, eventBus);
  await bookingUpdater.run(parseInt(id, 10), { status });
  res.status(200).send('Booking udpated');
});
export { create, index, deleteBooking, updateBooking };
