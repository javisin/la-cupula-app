import Booking, { BookingRepository } from '../domain/Booking';
import UserPlanBookingsIncrementer from '../../Users/application/UserPlanBookingsIncrementer';

export default class BookingUpdater {
  constructor(
    private readonly repository: BookingRepository,
    private readonly userPlanBookingsIncrementer: UserPlanBookingsIncrementer,
  ) {}

  async run(id: number, changeset: Partial<Booking>) {
    const booking = await this.repository.find(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    const updatedBooking = { ...booking, ...changeset };
    await this.repository.update(id, updatedBooking);

    if (changeset.status === 'approved') {
      await this.userPlanBookingsIncrementer.run(booking.userId);
    }
  }
}
