import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from './index';
import Lesson from './lesson';

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
  declare addLesson: (lesson: Lesson | number, options?: any) => Promise<void>;

  async $add(lesson1: string, lesson: Lesson | null) {}
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
    modelName: 'User',
    underscored: true,
  },
);
