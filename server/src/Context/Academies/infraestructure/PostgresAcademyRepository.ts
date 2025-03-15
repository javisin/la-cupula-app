import { AcademyRepository } from '../domain/AcademyRepository';
import { SequelizeAcademy } from './SequelizeAcademy';
import { Academy } from '../domain/Academy';

export default class PostgresAcademyRepository implements AcademyRepository {
  readonly Model = SequelizeAcademy;

  readonly Entity = Academy;

  async get() {
    const sequelizeAcademies = await this.Model.findAll();
    return sequelizeAcademies.map((academy: Academy) => new this.Entity(academy));
  }
}
