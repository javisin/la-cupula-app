import { DomainEvent } from '../../Shared/domain/DomainEvent';

type ApproveBookingDomainEventAttributes = {
  readonly userId: number;
  readonly lessonId: number;
};

export class BookingApprovedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'booking.approved';

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
    super({ eventName: BookingApprovedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.lessonId = lessonId;
  }

  toPrimitives(): ApproveBookingDomainEventAttributes {
    const { userId, lessonId } = this;
    return {
      userId,
      lessonId,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: ApproveBookingDomainEventAttributes;
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
