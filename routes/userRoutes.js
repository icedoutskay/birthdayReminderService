const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('form');
});

router.post('/register', async (req, res) => {
  const { username, email, dateOfBirth } = req.body;

  try {
    const newUser = new User({ username, email, dateOfBirth });
    await newUser.save();
    res.send('User registered successfully!');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;