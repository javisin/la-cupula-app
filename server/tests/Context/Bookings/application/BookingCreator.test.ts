import BookingCreator from '../../../../src/Context/Bookings/application/BookingCreator';
import Booking from '../../../../src/Context/Bookings/domain/Booking';

describe('BookingCreator', () => {
  it('should save a booking', () => {
    const mockRepository = {
      save: jest.fn(),
    };
    const bookingCreator = new BookingCreator(mockRepository);
    const bookingParams = { userId: 1, lessonId: 2 };
    bookingCreator.run({ userId: 1, lessonId: 2 });
    const expectedBooking = new Booking({ ...bookingParams, status: 'pending', id: 1 });
    expect(mockRepository.save).toHaveBeenCalledWith(expectedBooking);
  });
});
