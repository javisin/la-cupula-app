import { BookingRepository, BookingStatus } from '../domain/Booking';
import UserPlanBookingsIncrementer from '../../Users/application/UserPlanBookingsIncrementer';
import { EventBus } from '../../Shared/domain/EventBus';

export default class BookingUpdater {
  constructor(
    private readonly repository: BookingRepository,
    private readonly userPlanBookingsIncrementer: UserPlanBookingsIncrementer,
    private readonly eventBus: EventBus,
  ) {}

  async run(id: number, changeset: { status?: BookingStatus }) {
    const booking = await this.repository.find(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    if (changeset.status) {
      booking.setStatus(changeset.status);
    }

    await this.repository.update(id, booking);
    await this.eventBus.publish(booking.pullDomainEvents());
  }
}
