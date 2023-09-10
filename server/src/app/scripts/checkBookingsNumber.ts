import { Op } from 'sequelize';
import User from '../../database/models/user';
import { BookingModel } from '../../Context/Bookings/infraestructure/BookingModel';
import { LessonModel } from '../../Context/Lessons/infraestructure/LessonModel';

process.env.TZ = 'Europe/London';

function getWeekDatesForMonth(start: Date): { startDate: Date; endDate: Date }[] {
  const month = new Date(start);
  const result: { startDate: Date; endDate: Date }[] = [];
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
  startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));

  while (startDate.getMonth() <= month.getMonth()) {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // End of the week (6 days later)
    result.push({ startDate: new Date(startDate), endDate });

    startDate.setDate(startDate.getDate() + 7);
  }

  return result;
}
async function main() {
  const weekDates = getWeekDatesForMonth(new Date('2023-09-01'));
  // eslint-disable-next-line no-restricted-syntax
  for (const weekDate of weekDates) {
    const bookings = await BookingModel.findAll({
      include: [
        { model: User, as: 'user' },
        {
          model: LessonModel,
          as: 'lesson',
          where: {
            startDate: {
              [Op.gt]: weekDate.startDate,
              [Op.lt]: weekDate.endDate,
            },
          },
        },
      ],
    });
    const bookingsByUser: Map<number, number> = new Map();
    // eslint-disable-next-line no-restricted-syntax
    for (const booking of bookings) {
      if (booking.status !== 'approved') {
        // eslint-disable-next-line no-continue
        continue;
      }
      const userBookings = bookingsByUser.get(booking.userId);
      bookingsByUser.set(booking.userId, (userBookings ?? 0) + 1);
    }
    console.log(bookingsByUser);
  }
  process.exit();
}

main();
