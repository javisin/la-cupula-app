import { UserRepository } from '../domain/User';
import { UserModel } from './UserModel';

export default class PostgresUserRepository implements UserRepository {
  readonly model = UserModel;

  async find(id: number) {
    return this.model.findOne({ where: { id } });
  }
}
