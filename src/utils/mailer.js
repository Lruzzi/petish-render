const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer')

// exports.mailTransport = () => nodemailer.createTransport({
//         // host: "smtp.mailtrap.io",
//         // port: 2525,
//         // auth: {
//         //   user: "b60b15b3d44878",
//         //   pass: "7cba97bfa7d127"
//         // }
//         service: 'gmail',
//           auth: {
//             user: 'luzzigan7@gmail.com',
//             pass: 'ghulam27'
//           }
//       });

      
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

