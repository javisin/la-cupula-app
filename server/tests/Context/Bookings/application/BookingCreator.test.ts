import BookingCreator from '../../../../src/Context/Bookings/application/BookingCreator';
import Booking from '../../../../src/Context/Bookings/domain/Booking';
import UserRepositoryMock from '../../../__mocks__/UserRepositoryMock';
import UserFinder from '../../../../src/Context/Users/application/UserFinder';
import { UserMother } from '../../Users/domain/UserMother';
import BookingRepositoryMock from '../../../__mocks__/BookingRepositoryMock';
import UnauthorizedUserError from '../../../../src/Context/Users/domain/UnauthorizedUserError';
import PlanFinder from '../../../../src/Context/Plans/application/PlansFinder';
import PlanRepositoryMock from '../../../__mocks__/PlanRepositoryMock';
import { PlanMother } from '../../Plans/domain/PlanMother';

describe('BookingCreator', () => {
  const bookingRepository = new BookingRepositoryMock();
  const planRepository = new PlanRepositoryMock();
  const userRepository = new UserRepositoryMock();
  const userFinder = new UserFinder(userRepository);
  const planFinder = new PlanFinder(planRepository);
  const bookingCreator = new BookingCreator(bookingRepository, userFinder, planFinder);

  it('should throw error if user does not have a plan', async () => {
    userRepository.find.mockResolvedValueOnce(UserMother.random({ planId: null }));
    await expect(bookingCreator.run({ userId: 1, lessonId: 2 })).rejects.toThrowError(
      new UnauthorizedUserError('User does not have an active plan'),
    );
  });

  it('should throw error if user has reached lessons limit', async () => {
    userRepository.find.mockResolvedValue(UserMother.random({ planBookings: 10 }));
    planRepository.find.mockResolvedValue(PlanMother.random({ lessons: 10 }));

    await expect(bookingCreator.run({ userId: 1, lessonId: 2 })).rejects.toThrowError(
      new UnauthorizedUserError('User has reached their lessons limit'),
    );
  });

  it('should save a booking', async () => {
    const bookingParams = { userId: 1, lessonId: 2 };
    userRepository.find.mockResolvedValue(UserMother.random());
    planRepository.find.mockResolvedValue(PlanMother.random());

    await bookingCreator.run(bookingParams);
    const expectedBooking = new Booking({ ...bookingParams, status: 'pending', id: 1 });
    expect(bookingRepository.save).toHaveBeenCalledWith(expectedBooking);
  });
});
