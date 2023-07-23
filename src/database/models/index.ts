import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'development';

let sequelize: Sequelize;
if (env === 'production') {
  if (process.env.DB_URL === undefined) {
    throw new Error('Missing DB_URL');
  }
  sequelize = new Sequelize(process.env.DB_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  if (process.env.DB_DATABASE === undefined) {
    throw new Error('Missing DB_DATABASE');
  }
  if (process.env.DB_USERNAME === undefined) {
    throw new Error('Missing DB_USERNAME');
  }
  if (process.env.DB_PASSWORD === undefined) {
    throw new Error('Missing DB_PASSWORD');
  }
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      port: 5432,
    },
  );
}

sequelize
  .authenticate()
  .then(() => {
    // sequelize.sync();
    console.log('DB connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });
export default sequelize;
