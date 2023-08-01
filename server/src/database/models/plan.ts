import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from './index';
import User from './user';

export default class Plan extends Model<InferAttributes<Plan>, InferCreationAttributes<Plan>> {
  declare id: CreationOptional<number>;

  declare weekLessons: Number;

  declare name: string;

  declare price: number;
}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    weekLessons: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
  },
  {
    sequelize,
    underscored: true,
  },
);

User.belongsTo(Plan, { as: 'plan' });
Plan.hasMany(User);
