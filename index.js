require('dotenv').config();
const app = require('./app/app');

const port = 5000;
app.listen(process.env.PORT || port, () => {
  console.log('Server running');
});
