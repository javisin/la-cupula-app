import { UserMother } from '../domain/UserMother';
import UserRepositoryMock from '../../../__mocks__/UserRepositoryMock';
import UserFinder from '../../../../src/Context/Users/application/UserFinder';

describe('UserFinder', () => {
  it('should return the user found', async () => {
    const expectedUser = UserMother.random();
    const mockRepository = new UserRepositoryMock();
    const userFinder = new UserFinder(mockRepository);

    mockRepository.find.mockResolvedValueOnce(expectedUser);
    const user = await userFinder.run(1);
    expect(user).toEqual(expectedUser);
  });

  it('should return null if user does not exist', async () => {
    const mockRepository = new UserRepositoryMock();
    const userFinder = new UserFinder(mockRepository);

    mockRepository.find.mockResolvedValueOnce(null);
    const user = await userFinder.run(1);
    expect(user).toEqual(null);
  });
});
