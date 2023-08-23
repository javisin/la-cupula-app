import Booking, { BookingRepository } from '../domain/Booking';

export default class BookingUpdater {
  private readonly repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  async run(id: number, changeset: Partial<Booking>) {
    const booking = await this.repository.find(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    const updatedBooking = { ...booking, ...changeset };
    await this.repository.update(id, updatedBooking);
  }
}
