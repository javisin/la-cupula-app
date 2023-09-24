import { BookingRepository } from '../../src/Context/Bookings/domain/Booking';

export default class BookingRepositoryMock implements BookingRepository {
  save = jest.fn();

  find = jest.fn();

  update = jest.fn();
}
