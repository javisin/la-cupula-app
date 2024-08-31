import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../../../database/models';
import { SequelizeLesson } from '../../Lessons/infraestructure/LessonModel';
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

SequelizeUser.belongsToMany(SequelizeLesson, { through: Booking });
SequelizeLesson.belongsToMany(SequelizeUser, { through: Booking });
SequelizeUser.hasMany(Booking, { onDelete: 'cascade' });
Booking.belongsTo(SequelizeUser, { as: 'user' });
SequelizeLesson.hasMany(Booking, { onDelete: 'cascade' });
Booking.belongsTo(SequelizeLesson, { as: 'lesson' });

export { Booking as BookingModel };
