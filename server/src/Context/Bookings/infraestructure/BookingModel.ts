import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../../../database/models';
import { LessonModel } from '../../Lessons/infraestructure/LessonModel';
import { SequelizeUser } from '../../Users/infraestructure/UserModel';

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

SequelizeUser.belongsToMany(LessonModel, { through: Booking });
LessonModel.belongsToMany(SequelizeUser, { through: Booking });
SequelizeUser.hasMany(Booking, { onDelete: 'cascade' });
Booking.belongsTo(SequelizeUser, { as: 'user' });
LessonModel.hasMany(Booking, { onDelete: 'cascade' });
Booking.belongsTo(LessonModel, { as: 'lesson' });

export { Booking as BookingModel };
