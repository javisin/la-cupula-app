import { DomainEvent } from '../../Shared/domain/DomainEvent';
import { BookingApprovedDomainEvent } from './BookingApprovedDomainEvent';
import { BookingCreatedDomainEvent } from './BookingCreatedDomainEvent';

export type BookingStatus = 'pending' | 'approved' | 'declined';

export default class Booking {
  static create(props: {
    userId: number;
    lessonId: number;
    status: 'pending' | 'approved' | 'declined';
  }) {
    const newBooking = new Booking({ ...props, id: 1 });
    newBooking.record(
      new BookingCreatedDomainEvent({
        ...newBooking,
        aggregateId: newBooking.id.toString(), // TODO: this won't be the real one
        eventId: 'test',
      }),
    );
    return newBooking;
  }

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
