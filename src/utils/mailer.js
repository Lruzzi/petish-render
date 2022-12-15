const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer')

      
var transporter = nodemailer.createTransport({
service: 'gmail',
            auth: {
              user: process.env.USER_MAILER,
              pass: process.env.PASS_MAILER
            },
            tls: {
                rejectUnauthorized: false
            }
});

module.exports = {
  transporter
}

