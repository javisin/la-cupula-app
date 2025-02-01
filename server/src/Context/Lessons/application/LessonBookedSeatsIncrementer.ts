import { LessonRepository } from '../domain/Lesson';

export default class LessonBookedSeatsIncrementer {
  constructor(private readonly repository: LessonRepository) {}

  async run(id: number) {
    const lesson = await this.repository.find(id);
    if (!lesson) {
      console.error('Lesson not found');
      return;
    }
    lesson.incrementBookedSeats();
    await this.repository.update(lesson);
  }
}
