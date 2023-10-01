import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import sequelize from '../../../database/models';
import { SequelizeUser } from '../../Users/infraestructure/UserModel';

class Plan extends Model<InferAttributes<Plan>, InferCreationAttributes<Plan>> {
  declare id: string;

  declare lessons: number;

  declare name: string;

  declare price: number;

  declare mode: 'subscription' | 'payment';

  declare order: number;
}

Plan.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    lessons: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    mode: DataTypes.STRING,
    order: DataTypes.INTEGER,
  },
  {
    sequelize,
    underscored: true,
    tableName: 'plans',
  },
);

SequelizeUser.belongsTo(Plan, { as: 'plan' });
Plan.hasMany(SequelizeUser);

export { Plan as PlanModel };
