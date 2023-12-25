import Lesson, { LessonRepository } from '../domain/Lesson';

export default class LessonCreator {
  private readonly repository: LessonRepository;

  constructor(repository: LessonRepository) {
    this.repository = repository;
  }

  async run({ startDate, endDate, type }: { startDate: string; endDate: string; type: string }) {
    const newLesson = new Lesson({
      id: 1,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      type,
    });

    await this.repository.save(newLesson);
  }
}
