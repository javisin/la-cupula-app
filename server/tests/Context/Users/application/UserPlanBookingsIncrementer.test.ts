import UserRepositoryMock from '../../../__mocks__/UserRepositoryMock';
import UserFinder from '../../../../src/Context/Users/application/UserFinder';
import { UserMother } from '../domain/UserMother';
import UserPlanBookingsIncrementer from '../../../../src/Context/Users/application/UserPlanBookingsIncrementer';
import PlanFinder from '../../../../src/Context/Plans/application/PlansFinder';
import PlanRepositoryMock from '../../../__mocks__/PlanRepositoryMock';
import { PlanMother } from '../../Plans/domain/PlanMother';

describe('UserPlanBookingsIncrementer', () => {
  const repository = new UserRepositoryMock();
  const planRepository = new PlanRepositoryMock();
  const userFinder = new UserFinder(repository);
  const planFinder = new PlanFinder(planRepository);
  const userPlanBookingsIncrementer = new UserPlanBookingsIncrementer(
    repository,
    userFinder,
    planFinder,
  );

  it('should increment the user plan bookings', async () => {
    const user = UserMother.random({ id: 1 });
    repository.find.mockResolvedValueOnce(user);
    const plan = PlanMother.random({ id: 'planId' });
    planRepository.find.mockResolvedValueOnce(plan);
    const expectedUserPlanBookings = user.planBookings + 1;

    await userPlanBookingsIncrementer.run(1);
    expect(repository.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, planBookings: expectedUserPlanBookings }),
    );
  });

  it('should remove plan is mode is payment and limit is reached', async () => {
    const user = UserMother.random({ id: 1, planBookings: 4 });
    repository.find.mockResolvedValueOnce(user);
    const plan = PlanMother.random({ id: 'planId', lessons: 5, mode: 'payment' });
    planRepository.find.mockResolvedValueOnce(plan);

    await userPlanBookingsIncrementer.run(1);
    expect(repository.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, planId: null }),
    );
  });

  it('should not remove plan if limit is not reached', async () => {
    const user = UserMother.random({ id: 1, planBookings: 4 });
    repository.find.mockResolvedValueOnce(user);
    const plan = PlanMother.random({ id: 'planId', lessons: 6, mode: 'payment' });
    planRepository.find.mockResolvedValueOnce(plan);

    await userPlanBookingsIncrementer.run(1);
    expect(repository.update).toHaveBeenCalledWith(expect.not.objectContaining({ planId: null }));
  });
});
