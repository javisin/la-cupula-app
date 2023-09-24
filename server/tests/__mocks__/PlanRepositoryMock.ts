import { PlanRepository } from '../../src/Context/Plans/domain/Plan';

export default class PlanRepositoryMock implements PlanRepository {
  get = jest.fn();

  find = jest.fn();
}
