import express from 'express'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import trainingRoutes from './routes/training';
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(fileUpload({}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use('/', userRoutes);
app.use('/', trainingRoutes);

const DEFAULT_PORT = 3000;
app.listen(process.env.PORT || DEFAULT_PORT, () => {
  console.log('Server running');
});
