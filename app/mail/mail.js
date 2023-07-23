const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lacupulaebjj@gmail.com',
    pass: '10Javi98*',
  },
});
module.exports = transporter;
