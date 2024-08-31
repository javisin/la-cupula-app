import { Op } from 'sequelize';
import { BookingModel } from '../../Context/Bookings/infraestructure/BookingModel';
import { SequelizeLesson } from '../../Context/Lessons/infraestructure/LessonModel';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';

process.env.TZ = 'Europe/London';

async function main() {
  const bookings = await BookingModel.findAll({
    include: [
      { model: SequelizeUser, as: 'user' },
      {
        model: SequelizeLesson,
        as: 'lesson',
        where: {
          startDate: {
            [Op.gt]: new Date('2023-09-01'),
            [Op.lt]: new Date('2023-09-30'),
          },
        },
      },
    ],
    where: {
      status: 'approved',
    },
  });
  const bookingsByUser: Map<number, number> = new Map();
  // eslint-disable-next-line no-restricted-syntax
  for (const booking of bookings) {
    if (booking.status !== 'approved') {
      continue;
    }
    const userBookings = bookingsByUser.get(booking.userId);
    bookingsByUser.set(booking.userId, (userBookings ?? 0) + 1);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [userId, planBookings] of bookingsByUser.entries()) {
    const user = await SequelizeUser.findOne({ where: { id: userId } });
    if (!user) continue;
    user.planBookings = planBookings;
    await user.save();
  }
  process.exit();
}

main();
