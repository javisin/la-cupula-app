import { PlanModel } from './PlanModel';
import { PlanRepository } from '../domain/Plan';

export default class PostgresPlanRepository implements PlanRepository {
  readonly model = PlanModel;

  async get() {
    return this.model.findAll();
  }
}
