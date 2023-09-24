import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import User from '../../../../src/Context/Users/domain/User';

export class UserMother {
  private static readonly mother = Factory.define<User>(
    () =>
      new User({
        id: faker.number.int(100),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        nickName: faker.person.firstName(),
        email: faker.internet.email(),
        belt: faker.helpers.arrayElement(['white', 'blue', 'purple', 'brown', 'black']),
        stripes: faker.number.int({ min: 0, max: 4 }),
        startDate: faker.date.anytime(),
        password: faker.string.alphanumeric(),
        image: faker.internet.url(),
        instructor: faker.helpers.arrayElement([true, false]),
        planId: faker.string.alphanumeric(10),
        customerId: faker.string.alphanumeric(10),
        planBookings: faker.number.int(20),
      }),
  );

  static random(params?: Partial<User>) {
    return this.mother.build(params);
  }
}
