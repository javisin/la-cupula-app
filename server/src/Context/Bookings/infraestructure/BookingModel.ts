import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../../../database/models';
import User from '../../../database/models/user';
import { LessonModel } from '../../Lessons/infraestructure/LessonModel';

class Booking extends Model<InferAttributes<Booking>, InferCreationAttributes<Booking>> {
  declare id: CreationOptional<number>;

  declare userId: number;

  declare lessonId: number;

  declare status: 'pending' | 'approved' | 'declined';
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
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: 'bookings',
    name: { singular: '' },
  },
);

User.belongsToMany(LessonModel, { through: Booking });
LessonModel.belongsToMany(User, { through: Booking });
User.hasMany(Booking);
Booking.belongsTo(User, { as: 'user' });
LessonModel.hasMany(Booking);
Booking.belongsTo(LessonModel, { as: 'lesson' });

export { Booking as BookingModel };
