import BookingCreator from '../../../../src/Context/Bookings/application/BookingCreator';
import Booking from '../../../../src/Context/Bookings/domain/Booking';
import UserRepositoryMock from '../../../__mocks__/UserRepositoryMock';
import UserFinder from '../../../../src/Context/Users/application/UserFinder';
import { UserMother } from '../../Users/domain/UserMother';
import BookingRepositoryMock from '../../../__mocks__/bookingRepositoryMock';
import UserNotFoundError from '../../../../src/Context/Users/domain/UserNotFoundError';
import UnauthorizedUserError from '../../../../src/Context/Users/domain/UnauthorizedUserError';
import UserUpdater from '../../../../src/Context/Users/application/UserUpdater';

describe('BookingCreator', () => {
  const bookingRepository = new BookingRepositoryMock();
  const userRepository = new UserRepositoryMock();
  const userFinder = new UserFinder(userRepository);
  const userUpdater = new UserUpdater(userRepository, userFinder);
  userUpdater.run = jest.fn();

  const bookingCreator = new BookingCreator(bookingRepository, userFinder, userUpdater);

  it('should throw error if user does not exist', async () => {
    userRepository.find.mockResolvedValueOnce(null);
    await expect(bookingCreator.run({ userId: 1, lessonId: 2 })).rejects.toThrowError(
      new UserNotFoundError(),
    );
  });

  it('should throw error if user does not have a plan', async () => {
    userRepository.find.mockResolvedValueOnce(UserMother.random({ planId: null }));
    await expect(bookingCreator.run({ userId: 1, lessonId: 2 })).rejects.toThrowError(
      new UnauthorizedUserError('User does not have an active plan'),
    );
  });

  it('should save a booking', async () => {
    const bookingParams = { userId: 1, lessonId: 2 };
    userRepository.find.mockResolvedValue(UserMother.random());

    await bookingCreator.run(bookingParams);
    const expectedBooking = new Booking({ ...bookingParams, status: 'pending', id: 1 });
    expect(bookingRepository.save).toHaveBeenCalledWith(expectedBooking);
  });

  it('should update the user plan bookings count', async () => {
    const bookingParams = { userId: 1, lessonId: 2 };
    const user = UserMother.random();
    userRepository.find.mockResolvedValue(user);

    await bookingCreator.run(bookingParams);
    expect(userUpdater.run).toHaveBeenCalledWith(user.id, { planBookings: user.planBookings + 1 });
  });
});
