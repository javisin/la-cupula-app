import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../../../database/models';
import User from '../../../database/models/user';
import Plan from '../../../database/models/plan';
import LessonModel from '../../Lessons/infraestructure/LessonModel';

export default class BookingModel extends Model<
  InferAttributes<BookingModel>,
  InferCreationAttributes<BookingModel>
> {
  declare id: CreationOptional<number>;

  declare userId: number;

  declare lessonId: number;

  declare status: 'pending' | 'approved' | 'declined';
}

BookingModel.init(
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
  },
);

User.belongsToMany(LessonModel, { through: BookingModel });
LessonModel.belongsToMany(User, { through: BookingModel });
User.hasMany(BookingModel);
BookingModel.belongsTo(User, { as: 'user' });
LessonModel.hasMany(BookingModel);
BookingModel.belongsTo(LessonModel, { as: 'lesson' });
Plan.getTableName();
