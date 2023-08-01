import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from './index';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
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
    email: DataTypes.STRING,
    belt: DataTypes.STRING,
    stripes: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    instructor: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    underscored: true,
  },
);
