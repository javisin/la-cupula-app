import Booking, { BookingRepository, BookingStatus } from '../domain/Booking';

export default class BookingCreator {
  private readonly repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  async run(params: { userId: number; lessonId: number; status?: BookingStatus }) {
    const booking = new Booking({ ...params, id: 1, status: params.status ?? 'pending' });
    await this.repository.save(booking);
  }
}
