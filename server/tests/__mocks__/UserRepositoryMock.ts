import { UserRepository } from '../../src/Context/Users/domain/User';

export default class UserRepositoryMock implements UserRepository {
  find = jest.fn();
}
