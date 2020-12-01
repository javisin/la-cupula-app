const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lacupulaebjj@gmail.com',
    pass: process.env.GMAIL_PWD,
  },
});
module.exports = transporter;
