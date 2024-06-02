import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from '../../../database/models';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;

  declare firstName: string;

  declare lastName: string;

  declare nickName: string;

  declare email: string;

  declare belt: string;

  declare stripes: number;

  declare startDate: Date;

  declare password: string;

  declare image: string;

  declare instructor: boolean;

  declare planId: string | null;

  declare subscriptionId: string | null;

  declare paidAt: Date | null;

  declare customerId: string;

  declare planBookings: number;

  declare deleted: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nickName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    belt: DataTypes.STRING,
    stripes: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    instructor: DataTypes.BOOLEAN,
    planId: DataTypes.STRING,
    subscriptionId: DataTypes.STRING,
    paidAt: DataTypes.DATE,
    customerId: DataTypes.STRING,
    planBookings: { type: DataTypes.INTEGER, defaultValue: 0 },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    underscored: true,
  },
);

export { User as SequelizeUser };
