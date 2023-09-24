import UserRepositoryMock from '../../../__mocks__/UserRepositoryMock';
import UserFinder from '../../../../src/Context/Users/application/UserFinder';
import { UserMother } from '../domain/UserMother';
import UserPlanBookingsIncrementer from '../../../../src/Context/Users/application/UserPlanBookingsIncrementer';

describe('UserPlanBookingsIncrementer', () => {
  const repository = new UserRepositoryMock();
  const userFinder = new UserFinder(repository);
  const userPlanBookingsIncrementer = new UserPlanBookingsIncrementer(repository, userFinder);

  it('should increment the user plan bookings', async () => {
    const user = UserMother.random({ id: 1 });
    repository.find.mockResolvedValueOnce(user);
    const expectedUserPlanBookings = user.planBookings + 1;

    await userPlanBookingsIncrementer.run(1);
    expect(repository.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, planBookings: expectedUserPlanBookings }),
    );
  });
});
