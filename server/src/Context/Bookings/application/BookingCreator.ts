import Booking, { BookingRepository, BookingStatus } from '../domain/Booking';
import UserFinder from '../../Users/application/UserFinder';
import UnauthorizedUserError from '../../Users/domain/UnauthorizedUserError';

export default class BookingCreator {
  constructor(
    private readonly repository: BookingRepository,
    private readonly userFinder: UserFinder,
  ) {}

  async run(params: { userId: number; lessonId: number; status?: BookingStatus }) {
    const user = await this.userFinder.run(params.userId);

    if (user.planId === null) {
      throw new UnauthorizedUserError('User does not have an active plan');
    }

    const booking = new Booking({ ...params, id: 1, status: params.status ?? 'pending' });
    await this.repository.save(booking);
  }
}
