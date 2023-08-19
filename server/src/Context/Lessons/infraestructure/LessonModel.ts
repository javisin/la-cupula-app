import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from '../../../database/models';

export default class LessonModel extends Model<
  InferAttributes<LessonModel>,
  InferCreationAttributes<LessonModel>
> {
  declare id: CreationOptional<number>;

  declare startDate: Date;

  declare endDate: Date;

  declare type: string;
}

LessonModel.init(
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
    underscored: true,
    tableName: 'lessons',
  },
);
