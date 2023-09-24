import { UserRepository } from '../domain/User';
import UserNotFoundError from '../domain/UserNotFoundError';

export default class UserFinder {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(id: number) {
    const user = await this.repository.find(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
