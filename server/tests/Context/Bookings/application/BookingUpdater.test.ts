import Booking from '../../../../src/Context/Bookings/domain/Booking';
import UserRepositoryMock from '../../../__mocks__/UserRepositoryMock';
import UserFinder from '../../../../src/Context/Users/application/UserFinder';
import BookingRepositoryMock from '../../../__mocks__/BookingRepositoryMock';
import BookingUpdater from '../../../../src/Context/Bookings/application/BookingUpdater';
import UserPlanBookingsIncrementer from '../../../../src/Context/Users/application/UserPlanBookingsIncrementer';
import { UserMother } from '../../Users/domain/UserMother';
import EventBusMock from '../../../__mocks__/EventBusMock';
import { BookingMother } from '../domain/BookingMother';

describe('BookingUpdater', () => {
  const eventBus = new EventBusMock();
  const bookingRepository = new BookingRepositoryMock();
  const userRepository = new UserRepositoryMock();
  const userFinder = new UserFinder(userRepository);
  const userPlanBookingsIncrementer = new UserPlanBookingsIncrementer(userRepository, userFinder);
  userPlanBookingsIncrementer.run = jest.fn();
  const bookingUpdater = new BookingUpdater(
    bookingRepository,
    userPlanBookingsIncrementer,
    eventBus,
  );

  it('should update a booking', async () => {
    const bookingParams: Partial<Booking> = { status: 'declined' };
    bookingRepository.find.mockResolvedValue(BookingMother.random({ status: 'pending' }));

    await bookingUpdater.run(1, bookingParams);
    expect(bookingRepository.update).toHaveBeenCalledWith(
      1,
      expect.objectContaining(bookingParams),
    );
  });

  it('should publish event if booking is approved', async () => {
    const bookingParams: Partial<Booking> = { status: 'approved' };
    bookingRepository.find.mockResolvedValue(
      BookingMother.random({ status: 'pending', userId: 1 }),
    );
    userRepository.find.mockResolvedValue(UserMother.random());

    await bookingUpdater.run(1, bookingParams);
    expect(eventBus.publish).toHaveBeenCalledWith([expect.objectContaining({ userId: 1 })]);
  });
});
