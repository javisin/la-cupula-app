import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../../../database/models';
import User from '../../../database/models/user';
import Lesson from '../../../database/models/lesson';
import Plan from '../../../database/models/plan';

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

User.belongsToMany(Lesson, { through: BookingModel });
Lesson.belongsToMany(User, { through: BookingModel });
User.hasMany(BookingModel);
BookingModel.belongsTo(User, { as: 'user' });
Lesson.hasMany(BookingModel);
BookingModel.belongsTo(Lesson, { as: 'lesson' });
Plan.getTableName();
