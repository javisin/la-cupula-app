import UserRepositoryMock from '../../../__mocks__/UserRepositoryMock';
import UserFinder from '../../../../src/Context/Users/application/UserFinder';
import { UserMother } from '../domain/UserMother';
import UserUpdater from '../../../../src/Context/Users/application/UserUpdater';

describe('UserUpdater', () => {
  const repository = new UserRepositoryMock();
  const userFinder = new UserFinder(repository);
  const userUpdater = new UserUpdater(repository, userFinder);

  it('should update the user', async () => {
    repository.find.mockResolvedValueOnce(UserMother.random({ id: 1 }));
    await userUpdater.run(1, { planBookings: 17 });
    expect(repository.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, planBookings: 17 }),
    );
  });
});
