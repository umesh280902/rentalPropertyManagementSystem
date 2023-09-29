const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router(); // Create an express router without specifying a base URL
const { User } = require('./database');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'umeshkumawat2809@gmail.com',
    pass: 'zuvr azvd komm nklf',
  },
});

// Function to generate OTP
function generateOTP() {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// Authentication middleware
async function authenticate(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.send('Please log in again.');
  }
  try {
    const emailFromToken = jwt.verify(token, 'rentalpropertymanagement');
    req.email = emailFromToken.email; // Store email in the req object for later use
    next();
  } catch (error) {
    return res.send('Please log in again.');
  }
}

router.get('/user/signup', (req, res) => {
  res.render('signup');
});

var details;
var otp;

router.post('/user/signup', async (req, res) => {
  const { firstname, lastname, email, password, phonenumber } = req.body;
  details = req.body;
  console.log(details);
  if (!firstname || !lastname || !email || !password || !phonenumber) {
    res.send('Please fill out all the details.');
  } else {
    try {
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        res.send('User already exists.');
      } else {
        otp = generateOTP();
        let mailDetails = {
          from: 'RentEase',
          to: [email],
          subject: 'OTP verification',
          text: `Hi ${firstname} ${lastname}, your OTP for email verification is ${otp}`,
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log('Error Occurs');
            console.error(err);
            res.send('Error sending OTP.');
          } else {
            console.log('Email sent successfully with the OTP as ', otp);
            res.redirect('/user/otp');
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.send('Some error occurred.');
    }
  }
});

router.get('/user/login', (req, res) => {
  res.render('login');
});

router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send('Please fill out all the details.');
  } else {
    try {
      const existingUser = await User.findOne({ email: email });

      if (!existingUser) {
        res.send('User not found');
      } else {
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        console.log(passwordMatch);
        if (passwordMatch) {
          const token = jwt.sign({ email: existingUser.email }, 'rentalpropertymanagement');
          console.log(token);
          res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 50000) });
          res.redirect('/');
        } else {
          res.send('Incorrect password.');
        }
      }
    } catch (error) {
      console.error(error);
      res.send('User not found.');
    }
  }
});

router.get('/user/otp', (req, res) => {
  res.render('otp');
});

router.post('/user/otp', async (req, res) => {
  const { email_otp } = req.body;
  console.log('Entered OTP:', email_otp);
  try {
    if (otp === email_otp) {
      const hashedPassword = await bcrypt.hash(details.password, 10);
      const newUser = new User({
        firstname: details.firstname,
        lastname: details.lastname,
        email: details.email,
        password: hashedPassword,
        phonenumber: details.phonenumber,
      });
      const saveData = await newUser.save();
      const token = jwt.sign({ email: details.email }, 'rentalpropertymanagement');
      console.log(token);
      res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 50000) });
      res.redirect('/');
    } else {
      console.log('OTP Verification Failed');
      return res.status(500).json({ message: 'OTP verification failed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
