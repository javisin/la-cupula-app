import { DomainEvent } from '../../Shared/domain/DomainEvent';
import { BookingApprovedDomainEvent } from './BookingApprovedDomainEvent';

type BookingCreatedDomainEventAttributes = {
  readonly userId: number;
  readonly lessonId: number;
};

export class BookingCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'booking.created';

  readonly userId: number;

  readonly lessonId: number;

  constructor({
    aggregateId,
    userId,
    lessonId,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId: string;
    userId: number;
    lessonId: number;
    occurredOn?: Date;
  }) {
    super({ eventName: BookingCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.lessonId = lessonId;
  }

  toPrimitives(): BookingCreatedDomainEventAttributes {
    const { userId, lessonId } = this;
    return {
      userId,
      lessonId,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: BookingCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new BookingApprovedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      lessonId: attributes.lessonId,
      eventId,
      occurredOn,
    });
  }
}
