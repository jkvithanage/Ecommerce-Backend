const Joi = require('joi');
const { User } = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const express = require('express');
const router = express.Router();

// Returns auth token for login
router.post('/', async (req, res) => {
  const result = validateAuth(req.body);
  if (result.error) return res.status(400).send(result.error.details);

  //   Check for users with same email
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password.');

  const token = user.generateAuthToken();

  res.send(token);
});

function validateAuth(req) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      //   .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
