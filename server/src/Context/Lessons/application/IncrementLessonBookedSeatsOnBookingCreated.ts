import { DomainEventClass } from '../../Shared/domain/DomainEvent';
import { BookingApprovedDomainEvent } from '../../Bookings/domain/BookingApprovedDomainEvent';
import { DomainEventSubscriber } from '../../Shared/domain/DomainEventSubscriber';
import LessonBookedSeatsIncrementer from './LessonBookedSeatsIncrementer';
import { BookingCreatedDomainEvent } from '../../Bookings/domain/BookingCreatedDomainEvent';

export class IncrementLessonBookedSeatsOnBookingCreated implements DomainEventSubscriber {
  constructor(private incrementer: LessonBookedSeatsIncrementer) {}

  // eslint-disable-next-line class-methods-use-this
  subscribedTo(): DomainEventClass[] {
    return [BookingCreatedDomainEvent];
  }

  async on(domainEvent: BookingApprovedDomainEvent) {
    await this.incrementer.run(domainEvent.lessonId);
  }
}
