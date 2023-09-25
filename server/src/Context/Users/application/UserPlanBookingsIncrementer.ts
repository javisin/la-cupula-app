import { UserRepository } from '../domain/User';
import UserFinder from './UserFinder';

export default class UserPlanBookingsIncrementer {
  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinder,
  ) {}

  async run(id: number) {
    console.log('hola');
    const user = await this.userFinder.run(id);
    user.planBookings += 1;
    await this.repository.update(user);
  }
}
