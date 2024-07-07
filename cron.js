require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Connect to database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Check for birthdays at 7am every day
cron.schedule('0 7 * * *', async () => {
  try {
    const today = new Date();
    const users = await User.find({
      dateOfBirth: {
        $dayOfMonth: today.getDate(),
        $month: today.getMonth() + 1
      }
    });

    users.forEach(user => {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: 'Happy Birthday!',
        text: `Happy Birthday, ${user.username}! We hope you have a wonderful day!`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
});