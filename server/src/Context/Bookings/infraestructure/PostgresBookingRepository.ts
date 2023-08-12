import Booking, { BookingRepository } from '../domain/Booking';
import BookingModel from './BookingModel';

export default class PostgresBookingRepository implements BookingRepository {
  // eslint-disable-next-line class-methods-use-this
  async save(booking: Booking) {
    await BookingModel.create({ ...booking, id: undefined });
  }
}
