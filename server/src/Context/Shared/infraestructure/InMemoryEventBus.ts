import { EventEmitter } from 'events';
import { EventBus } from '../domain/EventBus';
import { DomainEvent } from '../domain/DomainEvent';
import { DomainEventSubscriber } from '../domain/DomainEventSubscriber';

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map((event) => this.emit(event.eventName, event));
  }

  addSubscribers(subscribers: DomainEventSubscriber[]) {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
      });
    });
  }
}
