// emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another email service
  auth: {
    user: 'ayushigupta36881@gmail.com',
    pass: 'nmqg ntzg dfse yqai'
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@example.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;