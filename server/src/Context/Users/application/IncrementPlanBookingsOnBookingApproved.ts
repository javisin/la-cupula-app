import { DomainEventClass } from '../../Shared/domain/DomainEvent';
import { BookingApprovedDomainEvent } from '../../Bookings/domain/BookingApprovedDomainEvent';
import UserPlanBookingsIncrementer from './UserPlanBookingsIncrementer';
import { DomainEventSubscriber } from '../../Shared/domain/DomainEventSubscriber';

export class IncrementCoursesCounterOnCourseCreated implements DomainEventSubscriber {
  constructor(private incrementer: UserPlanBookingsIncrementer) {}

  // eslint-disable-next-line class-methods-use-this
  subscribedTo(): DomainEventClass[] {
    return [BookingApprovedDomainEvent];
  }

  async on(domainEvent: BookingApprovedDomainEvent) {
    await this.incrementer.run(domainEvent.userId);
  }
}
