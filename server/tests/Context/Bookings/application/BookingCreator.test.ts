import BookingCreator from '../../../../src/Context/Bookings/application/BookingCreator';
import Booking from '../../../../src/Context/Bookings/domain/Booking';
import bookingRepositoryMock from '../../../__mocks__/bookingRepositoryMock';

describe('BookingCreator', () => {
  it('should save a booking', () => {
    const bookingCreator = new BookingCreator(bookingRepositoryMock);
    const bookingParams = { userId: 1, lessonId: 2 };
    bookingCreator.run({ userId: 1, lessonId: 2 });
    const expectedBooking = new Booking({ ...bookingParams, status: 'pending', id: 1 });
    expect(bookingRepositoryMock.save).toHaveBeenCalledWith(expectedBooking);
  });
});
