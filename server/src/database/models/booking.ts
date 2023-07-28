import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import sequelize from './index';
import User from './user';
import Lesson from './lesson';

export default class Booking extends Model<
  InferAttributes<Booking>,
  InferCreationAttributes<Booking>
> {
  declare userId: number;
  declare lessonId: number;
}

Booking.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    lessonId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
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
