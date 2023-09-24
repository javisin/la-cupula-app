import { PlanRepository } from '../domain/Plan';
import PlanNotFoundError from '../domain/PlanNotFoundError';

export default class PlanFinder {
  private readonly repository: PlanRepository;

  constructor(repository: PlanRepository) {
    this.repository = repository;
  }

  async run(id: string) {
    const plan = await this.repository.find(id);

    if (plan === null) {
      throw new PlanNotFoundError();
    }
    return plan;
  }
}
