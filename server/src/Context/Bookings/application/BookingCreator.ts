import Booking, { BookingRepository, BookingStatus } from '../domain/Booking';
import UserFinder from '../../Users/application/UserFinder';
import UnauthorizedUserError from '../../Users/domain/UnauthorizedUserError';
import PlanFinder from '../../Plans/application/PlansFinder';

export default class BookingCreator {
  constructor(
    private readonly repository: BookingRepository,
    private readonly userFinder: UserFinder,
    private readonly planFinder: PlanFinder,
  ) {}

  async run(params: { userId: number; lessonId: number; status?: BookingStatus }) {
    const user = await this.userFinder.run(params.userId);

    if (user.planId === null) {
      throw new UnauthorizedUserError('User does not have an active plan');
    }

    const plan = await this.planFinder.run(user.planId);

    if (user.planBookings >= plan.lessons) {
      throw new UnauthorizedUserError('User has reached their lessons limit');
    }

    const booking = new Booking({ ...params, id: 1, status: params.status ?? 'pending' });
    await this.repository.save(booking);
  }
}
