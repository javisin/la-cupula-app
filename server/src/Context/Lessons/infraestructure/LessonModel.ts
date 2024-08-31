import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from '../../../database/models';
import { SequelizeUser } from '../../Users/infraestructure/UserModel';

class Lesson extends Model<InferAttributes<Lesson>, InferCreationAttributes<Lesson>> {
  declare id: CreationOptional<number>;

  declare startDate: Date;

  declare endDate: Date;

  declare type: string;

  declare professorId: number;
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
    professorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: SequelizeUser,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: 'lessons',
  },
);

Lesson.belongsTo(SequelizeUser, { foreignKey: 'professorId', as: 'professor' });
SequelizeUser.hasMany(Lesson, { foreignKey: 'professorId', as: 'lessons' });
export { Lesson as SequelizeLesson };
