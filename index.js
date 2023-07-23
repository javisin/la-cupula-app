const port = 5000;
const app = require('./app/app');

app.listen(process.env.PORT || port, () => {
  console.log('Server running');
});
