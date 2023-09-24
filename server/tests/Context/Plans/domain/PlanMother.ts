import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import Plan from '../../../../src/Context/Plans/domain/Plan';

export class PlanMother {
  private static readonly mother = Factory.define<Plan>(
    () =>
      new Plan({
        id: faker.string.alphanumeric(10),
        lessons: faker.number.int(99),
        name: faker.commerce.productName(),
        price: parseFloat(faker.finance.amount()),
        mode: faker.helpers.arrayElement(['subscription', 'payment']),
      }),
  );

  static random(params?: Partial<Plan>) {
    return this.mother.build(params);
  }
}
