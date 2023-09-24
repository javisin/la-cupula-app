import User, { UserRepository } from '../domain/User';
import { UserModel } from './UserModel';

export default class PostgresUserRepository implements UserRepository {
  readonly model = UserModel;

  async find(id: number) {
    return this.model.findOne({ where: { id } });
  }

  async update(user: User) {
    await this.model.update(user, {
      where: { id: user.id },
    });
  }
}
