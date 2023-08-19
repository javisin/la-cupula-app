import { LessonRepository } from '../domain/Lesson';

export default class LessonsGetter {
  private readonly repository: LessonRepository;

  constructor(repository: LessonRepository) {
    this.repository = repository;
  }

  async run(params: { date?: Date }) {
    return this.repository.get(params);
  }
}
