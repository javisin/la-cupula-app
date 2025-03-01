import path from 'path';
import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import lessonRoutes from './routes/lesson';
import bookingRoutes from './routes/booking';
import planRoutes from './routes/plan';
import checkoutRoutes from './routes/checkout';
import stripeRoutes from './routes/stripeWebhooks';
import CronJobRunner from './crons';

dotenv.config();
const cronJobRunner = new CronJobRunner();
cronJobRunner.start();

const app = express();
app.use(fileUpload({}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api/auth', bodyParser.json(), authRoutes);
app.use('/api/lessons', bodyParser.json(), lessonRoutes);
app.use('/api/users', bodyParser.json(), userRoutes);
app.use('/api/bookings', bodyParser.json(), bookingRoutes);
app.use('/api/plans', bodyParser.json(), planRoutes);
app.use('/api/checkout-url', bodyParser.json(), checkoutRoutes);
app.use('/api/stripe', express.raw({ type: '*/*' }), stripeRoutes);

// Serve web-app content
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../../../web-app/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../web-app/build/index.html'));
  });
}

const DEFAULT_PORT = 3001;
app.listen(process.env.PORT || DEFAULT_PORT, () => {
  console.log('Server running');
  bcrypt.hash('alejobjj25', 10).then((hash) => console.log(hash));
});
