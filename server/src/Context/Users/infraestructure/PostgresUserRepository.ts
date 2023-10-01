import User, { UserRepository } from '../domain/User';
import { SequelizeUser } from './UserModel';

export default class PostgresUserRepository implements UserRepository {
  readonly model = SequelizeUser;

  async find(id: number) {
    const userModel = await this.model.findOne({ where: { id } });
    return userModel?.dataValues ?? null;
  }

  async update(user: User) {
    await this.model.update(user, {
      where: { id: user.id },
    });
  }
}
