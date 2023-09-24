import { UserMother } from '../domain/UserMother';
import UserRepositoryMock from '../../../__mocks__/UserRepositoryMock';
import UserFinder from '../../../../src/Context/Users/application/UserFinder';
import UserNotFoundError from '../../../../src/Context/Users/domain/UserNotFoundError';

describe('UserFinder', () => {
  it('should return the user found', async () => {
    const expectedUser = UserMother.random();
    const mockRepository = new UserRepositoryMock();
    const userFinder = new UserFinder(mockRepository);

    mockRepository.find.mockResolvedValueOnce(expectedUser);
    const user = await userFinder.run(1);
    expect(user).toEqual(expectedUser);
  });

  it('should throw an error if user does not exist', async () => {
    const mockRepository = new UserRepositoryMock();
    const userFinder = new UserFinder(mockRepository);

    mockRepository.find.mockResolvedValueOnce(null);
    await expect(userFinder.run(1)).rejects.toThrowError(new UserNotFoundError());
  });
});
