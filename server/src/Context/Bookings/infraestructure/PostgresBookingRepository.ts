import Booking, { BookingRepository } from '../domain/Booking';
import { BookingModel } from './BookingModel';

export default class PostgresBookingRepository implements BookingRepository {
  readonly model = BookingModel;

  async find(id: number) {
    const booking = await this.model.findOne({ where: { id } });
    return booking ? new Booking(booking) : null;
  }

  async save(booking: Booking) {
    await this.model.create({ ...booking, id: undefined });
  }

  async update(id: number, booking: Booking) {
    await this.model.update(
      { ...booking, id: undefined },
      {
        where: {
          id,
        },
      },
    );
  }
}
