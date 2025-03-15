import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from '../../../database/models';

class Academy extends Model<InferAttributes<Academy>, InferCreationAttributes<Academy>> {
  declare id: CreationOptional<number>;

  declare name: string;
}

Academy.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
  },
);

export { Academy as SequelizeAcademy };
