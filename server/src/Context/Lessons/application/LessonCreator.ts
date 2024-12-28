import Lesson, { LessonRepository } from '../domain/Lesson';

interface LessonCreatorParams {
  startDate: string;
  endDate: string;
  type: string;
  professorId: number;
}
export default class LessonCreator {
  private readonly repository: LessonRepository;

  constructor(repository: LessonRepository) {
    this.repository = repository;
  }

  async run({ startDate, endDate, type, professorId }: LessonCreatorParams) {
    const newLesson = new Lesson({
      id: 1,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      type,
      professor: { id: professorId, firstName: '', lastName: '', image: '' },
    });

    await this.repository.create(newLesson);
  }
}
