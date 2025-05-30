import Lesson, { LessonRepository } from '../domain/Lesson';

interface LessonCreatorParams {
  startDate: string;
  endDate: string;
  type: string;
  professorId: number;
  academyId: number;
  maxSeats?: number;
}

export default class LessonCreator {
  private readonly repository: LessonRepository;

  constructor(repository: LessonRepository) {
    this.repository = repository;
  }

  async run({ startDate, endDate, type, professorId, academyId, maxSeats }: LessonCreatorParams) {
    const newLesson = Lesson.create({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      maxSeats,
      academyId,
      type,
      professor: { id: professorId, firstName: '', lastName: '', image: '' },
    });

    await this.repository.create(newLesson);
  }
}
