import { Op } from 'sequelize';
import Lesson, { GetLessonsFilter, LessonRepository } from '../domain/Lesson';
import { SequelizeLesson } from './LessonModel';
import { SequelizeUser } from '../../Users/infraestructure/UserModel';

interface SequelizeAggregatedLesson extends SequelizeLesson {
  professor: SequelizeUser;
}

export default class PostgresLessonRepository implements LessonRepository {
  readonly model = SequelizeLesson;

  async get(filter?: GetLessonsFilter) {
    const whereStatement: { startDate?: { [Op.gt]: Date; [Op.lt]: Date } } = {};
    if (filter?.date) {
      const startDate = new Date(filter.date);
      const nextDayDate = new Date(startDate);
      nextDayDate.setDate(startDate.getDate() + 1);
      whereStatement.startDate = {
        [Op.gt]: startDate,
        [Op.lt]: nextDayDate,
      };
    }
    const sequelizeLessons = (await this.model.findAll({
      where: whereStatement,
      include: [{ model: SequelizeUser, as: 'professor' }],
      order: [['startDate', 'ASC']],
    })) as SequelizeAggregatedLesson[];
    return sequelizeLessons.map(this.mapToDomain);
  }

  async find(id: number) {
    const sequelizeLesson = (await this.model.findByPk(id, {
      include: [{ model: SequelizeUser, as: 'professor' }],
    })) as SequelizeAggregatedLesson | null;
    return sequelizeLesson ? this.mapToDomain(sequelizeLesson) : undefined;
  }

  async create(lesson: Lesson) {
    await this.model.create({ ...lesson, id: undefined, professorId: lesson.professor.id });
  }

  async update(lesson: Lesson) {
    await this.model.update(
      { ...lesson, id: undefined, professorId: lesson.professor.id },
      { where: { id: lesson.id } },
    );
  }

  private mapToDomain(sequelizeLesson: SequelizeLesson & { professor: SequelizeUser }) {
    return new Lesson({
      ...sequelizeLesson.dataValues,
      professor: { ...sequelizeLesson.professor.dataValues },
    });
  }
}
