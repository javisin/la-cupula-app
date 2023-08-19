import Booking, { BookingRepository } from '../domain/Booking';
import BookingModel from './BookingModel';

export default class PostgresBookingRepository implements BookingRepository {
  readonly model = BookingModel;

  async save(booking: Booking) {
    await this.model.create({ ...booking, id: undefined });
  }
}
