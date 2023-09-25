import { DomainEvent } from '../../Shared/domain/DomainEvent';
import { BookingApprovedDomainEvent } from './BookingApprovedDomainEvent';

export type BookingStatus = 'pending' | 'approved' | 'declined';

export default class Booking {
  readonly id: number;

  readonly userId: number;

  readonly lessonId: number;

  status: BookingStatus;

  private domainEvents: Array<DomainEvent>;

  constructor(props: {
    id: number;
    userId: number;
    lessonId: number;
    status: 'pending' | 'approved' | 'declined';
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.lessonId = props.lessonId;
    this.status = props.status;
    this.domainEvents = [];
  }

  setStatus(status: BookingStatus) {
    if (status === 'approved') {
      this.record(new BookingApprovedDomainEvent({ ...this, aggregateId: 'test', eventId: 'as' }));
    }
    this.status = status;
  }

  pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }
}

export interface BookingRepository {
  find(id: number): Promise<Booking | null>;
  save(booking: Booking): Promise<void>;
  update(id: number, booking: Booking): Promise<void>;
}
