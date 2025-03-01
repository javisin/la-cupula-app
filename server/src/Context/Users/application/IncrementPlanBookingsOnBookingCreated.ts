import { DomainEventClass } from '../../Shared/domain/DomainEvent';
import { BookingApprovedDomainEvent } from '../../Bookings/domain/BookingApprovedDomainEvent';
import UserPlanBookingsIncrementer from './UserPlanBookingsIncrementer';
import { DomainEventSubscriber } from '../../Shared/domain/DomainEventSubscriber';
import { BookingCreatedDomainEvent } from '../../Bookings/domain/BookingCreatedDomainEvent';

export class IncrementPlanBookingsOnBookingCreated implements DomainEventSubscriber {
  constructor(private incrementer: UserPlanBookingsIncrementer) {}

  // eslint-disable-next-line class-methods-use-this
  subscribedTo(): DomainEventClass[] {
    return [BookingCreatedDomainEvent];
  }

  async on(domainEvent: BookingApprovedDomainEvent) {
    await this.incrementer.run(domainEvent.userId);
  }
}
