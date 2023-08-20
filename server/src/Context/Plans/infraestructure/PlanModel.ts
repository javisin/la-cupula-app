import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import sequelize from '../../../database/models';
import User from '../../../database/models/user';

export default class PlanModel extends Model<
  InferAttributes<PlanModel>,
  InferCreationAttributes<PlanModel>
> {
  declare id: string;

  declare weekLessons: number;

  declare name: string;

  declare price: number;
}

PlanModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    weekLessons: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
  },
  {
    sequelize,
    underscored: true,
    tableName: 'plans',
  },
);

User.belongsTo(PlanModel, { as: 'plan' });
PlanModel.hasMany(User);
