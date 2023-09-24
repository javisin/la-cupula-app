import { UserRepository } from '../domain/User';

export default class UserFinder {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(id: number) {
    return this.repository.find(id);
  }
}
