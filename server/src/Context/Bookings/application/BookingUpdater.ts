import { BookingRepository, BookingStatus } from '../domain/Booking';
import { EventBus } from '../../Shared/domain/EventBus';

export default class BookingUpdater {
  constructor(
    private readonly repository: BookingRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(id: number, changeset: { status?: BookingStatus }) {
    const booking = await this.repository.find(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    if (changeset.status) {
      console.log(
        JSON.stringify({
          message: 'Updating status',
          changeset,
          bookingId: id,
          userId: booking.userId,
        }),
      );
      booking.setStatus(changeset.status);
    }

    await this.repository.update(id, booking);
    await this.eventBus.publish(booking.pullDomainEvents());
  }
}
