import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'development';
if (process.env.DB_DATABASE === undefined) {
  throw new Error('Missing DB_DATABASE');
}
if (process.env.DB_USERNAME === undefined) {
  throw new Error('Missing DB_USERNAME');
}
if (process.env.DB_PASSWORD === undefined) {
  throw new Error('Missing DB_PASSWORD');
}

let sequelize: Sequelize;
// if (env === 'production') {
//   sequelize = new Sequelize(config.url,
//     config);
// } else {
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
// }

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });
export default sequelize;
