import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import sequelize from './index';
import User from './user';
import Lesson from './lesson';
import Plan from './plan';

export default class Booking extends Model<
  InferAttributes<Booking>,
  InferCreationAttributes<Booking>
> {
  declare id: CreationOptional<number>;

  declare userId: number;

  declare lessonId: number;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    lessonId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
    sequelize,
    underscored: true,
  },
);

User.belongsToMany(Lesson, { through: Booking });
Lesson.belongsToMany(User, { through: Booking });
User.hasMany(Booking);
Booking.belongsTo(User, { as: 'user' });
Lesson.hasMany(Booking);
Booking.belongsTo(Lesson, { as: 'lesson' });
Plan.getTableName();
