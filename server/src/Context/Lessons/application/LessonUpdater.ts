import { LessonRepository } from '../domain/Lesson';
import LessonNotFoundError from '../domain/LessonNotFoundError';

interface LessonUpdaterParams {
  id: number;
  changeset: {
    startDate?: string;
    endDate?: string;
    type?: string;
    professorId?: number;
  };
}
export default class LessonUpdater {
  private readonly repository: LessonRepository;

  constructor(repository: LessonRepository) {
    this.repository = repository;
  }

  async run({ id, changeset }: LessonUpdaterParams) {
    const lesson = await this.repository.find(id);
    if (!lesson) {
      throw new LessonNotFoundError();
    }

    if (changeset.startDate) {
      lesson.startDate = new Date(changeset.startDate);
    }

    if (changeset.endDate) {
      lesson.endDate = new Date(changeset.endDate);
    }

    if (changeset.type) {
      lesson.type = changeset.type;
    }

    if (changeset.professorId) {
      lesson.professor.id = changeset.professorId;
    }

    await this.repository.update(lesson);
  }
}
