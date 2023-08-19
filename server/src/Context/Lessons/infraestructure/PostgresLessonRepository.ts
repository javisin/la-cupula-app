import { Op } from 'sequelize';
import { GetLessonsFilter, LessonRepository } from '../domain/Lesson';
import LessonModel from './LessonModel';

export default class PostgresLessonRepository implements LessonRepository {
  readonly model = LessonModel;

  async get(filter: GetLessonsFilter) {
    const whereStatement: { startDate?: { [Op.gt]: Date; [Op.lt]: Date } } = {};
    if (filter.date) {
      const startDate = new Date(filter.date);
      const nextDayDate = new Date(startDate);
      nextDayDate.setDate(startDate.getDate() + 1);
      whereStatement.startDate = {
        [Op.gt]: startDate,
        [Op.lt]: nextDayDate,
      };
    }

    return this.model.findAll({ where: whereStatement });
  }
}
