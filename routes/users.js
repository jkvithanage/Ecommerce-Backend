const auth = require('../middleware/auth');
const adminauth = require('../middleware/adminauth');
const { User, validateUser } = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// Get all users - only admins
router.get('/', async (req, res) => {
  const users = await User.find().sort('-createdAt');
  res.send(users);
});

// Get user by id - only logged in user
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('error 404: user not found.');

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

// Register a user
router.post('/', async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) return res.status(400).send(result.error.details);

  // Check for users with same email
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  // Hashing with bcrypt
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).json({
    newUser: _.pick(user, ['_id', 'name', 'email']),
    status: 'User registered.',
  });
});

// Update user details - only logged in users
router.put('/:id', async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) return res.status(400).send(result.error.details);

  let user = await User.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ['name', 'email', 'password']),
    { new: true }
  );
  if (!user)
    return res.status(400).send('User with the given id does not exist.');

  // Hashing with bcrypt
  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password, salt);

  // user.password = 'testing';
  await user.save();
  res.json({
    updatedUser: _.pick(user, ['id', 'name', 'email']),
    status: 'User updated.',
  });
});

// Delete user - only admins
router.delete('/:id', async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) return res.status(400).send(result.error.details);

  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(400).send('User with the given id does not exist.');

  res.json({
    deletedUser: _.pick(user, ['id', 'name', 'email']),
    status: 'User deleted!',
  });
});

module.exports = router;
