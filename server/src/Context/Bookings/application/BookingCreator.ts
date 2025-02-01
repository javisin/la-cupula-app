import Booking, { BookingRepository, BookingStatus } from '../domain/Booking';
import UserFinder from '../../Users/application/UserFinder';
import UnauthorizedUserError from '../../Users/domain/UnauthorizedUserError';
import PlanFinder from '../../Plans/application/PlansFinder';
import { LessonRepository } from '../../Lessons/domain/Lesson';
import { EventBus } from '../../Shared/domain/EventBus';

export default class BookingCreator {
  constructor(
    private readonly repository: BookingRepository,
    private readonly userFinder: UserFinder,
    private readonly planFinder: PlanFinder,
    private readonly lessonRepository: LessonRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(params: { userId: number; lessonId: number; status?: BookingStatus }) {
    const user = await this.userFinder.run(params.userId);

    if (user.planId === null) {
      throw new UnauthorizedUserError('User does not have an active plan');
    }

    const plan = await this.planFinder.run(user.planId);

    if (user.planBookings >= plan.lessons) {
      throw new UnauthorizedUserError('User has reached their lessons limit');
    }

    const lesson = await this.lessonRepository.find(params.lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    if (lesson.bookedSeats >= lesson.maxSeats) {
      throw new UnauthorizedUserError('Lesson is full');
    }

    const booking = Booking.create({ ...params, status: params.status ?? 'pending' });
    await this.repository.save(booking);
    await this.eventBus.publish(booking.pullDomainEvents());
  }
}
