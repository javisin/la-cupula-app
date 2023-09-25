import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import Booking from '../../../../src/Context/Bookings/domain/Booking';

export class BookingMother {
  private static readonly mother = Factory.define<Booking>(
    () =>
      new Booking({
        id: faker.number.int(100),
        status: faker.helpers.arrayElement(['pending', 'approved', 'declined']),
        userId: faker.number.int(10),
        lessonId: faker.number.int(10),
      }),
  );

  static random(params?: Partial<Booking>) {
    return this.mother.build(params);
  }
}
