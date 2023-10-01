import { UserRepository } from '../domain/User';
import UserFinder from './UserFinder';
import PlanFinder from '../../Plans/application/PlansFinder';

export default class UserPlanBookingsIncrementer {
  constructor(
    private readonly repository: UserRepository,
    private readonly userFinder: UserFinder,
    private readonly planFinder: PlanFinder,
  ) {}

  async run(id: number) {
    const user = await this.userFinder.run(id);
    user.planBookings += 1;

    const plan = await this.planFinder.run(user.planId!);
    if (user.planBookings === plan.lessons && plan.mode === 'payment') {
      user.planId = null;
    }
    await this.repository.update(user);
  }
}
