import { EventBus } from '../../src/Context/Shared/domain/EventBus';

export default class EventBusMock implements EventBus {
  publish = jest.fn();

  addSubscribers = jest.fn();
}
