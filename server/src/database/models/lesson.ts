import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from './index';
import User from './user';

export default class Lesson extends Model<
  InferAttributes<Lesson>,
  InferCreationAttributes<Lesson>
> {
  declare id: CreationOptional<number>;
  declare startDate: Date;
  declare endDate: Date;
  declare type: string;
  declare addUser: (user: User | number, options?: any) => Promise<void>;
}

Lesson.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    type: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Lesson',
    underscored: true,
  },
);

sequelize.define(
  'LessonUser',
  {},
  {
    underscored: true,
  },
);
Lesson.belongsToMany(User, { through: 'LessonUser', as: 'users', foreignKey: 'lessonId' });
User.belongsToMany(Lesson, { through: 'LessonUser', as: 'lessons', foreignKey: 'userId' });

Lesson.prototype.addUser = async function (user: User | number, options?: any): Promise<void> {
  const userId = typeof user === 'number' ? user : user.id;
  await sequelize.models.LessonUser.create({ lessonId: this.id, userId }, options);
};
