import { DomainEventClass } from './DomainEvent';
import { BookingApprovedDomainEvent } from '../../Bookings/domain/BookingApprovedDomainEvent';

export interface DomainEventSubscriber {
  subscribedTo(): DomainEventClass[];

  on(domainEvent: BookingApprovedDomainEvent): void;
}
