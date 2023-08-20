import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import sequelize from '../../../database/models';
import User from '../../../database/models/user';

class Plan extends Model<InferAttributes<Plan>, InferCreationAttributes<Plan>> {
  declare id: string;

  declare weekLessons: number;

  declare name: string;

  declare price: number;
}

Plan.init(
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

User.belongsTo(Plan, { as: 'plan' });
Plan.hasMany(User);

export { Plan as PlanModel };
