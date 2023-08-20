import { PlanRepository } from '../domain/Plan';

export default class PlansGetter {
  private readonly repository: PlanRepository;

  constructor(repository: PlanRepository) {
    this.repository = repository;
  }

  async run() {
    return this.repository.get();
  }
}
