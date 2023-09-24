import User, { UserRepository } from '../domain/User';
import UserFinder from './UserFinder';

interface UserChangeset {
  planBookings: number;
}

export default class UserUpdater {
  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinder,
  ) {}

  async run(id: number, changeset: UserChangeset) {
    const user = await this.userFinder.run(id);
    const updatedUser = new User({ ...user, planBookings: changeset.planBookings });
    await this.repository.update(updatedUser);
  }
}
