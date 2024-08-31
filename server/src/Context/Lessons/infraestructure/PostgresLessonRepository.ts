import { Op } from 'sequelize';
import Lesson, { GetLessonsFilter, LessonRepository } from '../domain/Lesson';
import { SequelizeLesson } from './LessonModel';
import { SequelizeUser } from '../../Users/infraestructure/UserModel';

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
    const sequelizeLessons = await this.model.findAll({
      where: whereStatement,
      include: [{ model: SequelizeUser, as: 'professor' }],
      order: [['startDate', 'ASC']],
    });
    return sequelizeLessons.map((lesson) => new Lesson(lesson));
  }

  async save(lesson: Lesson) {
    await this.model.create({ ...lesson, id: undefined });
  }
}
