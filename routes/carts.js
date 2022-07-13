const { Cart } = require('../models/carts');
const express = require('express');
const router = express.Router();

// GET active carts - admin only
router.get('/allcarts', async (req, res) => {
  const carts = await Cart.find().sort('-createdAt');

  res.send(carts);
});

// GET cart by userId
router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) return res.status(404).send('User has not created any cart yet.');

  res.send(cart);
});

// Create a cart
router.post('/', async (req, res) => {
  const cart = new Cart(req.body);
  await cart.save();

  res.send(cart);
});

// Update cart by cart Id
router.put('/:id', async (req, res) => {
  const cart = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.send(cart);
});

// Delete cart by cart Id
router.delete('/:id', async (req, res) => {
  const cart = await Cart.findByIdAndRemove(req.params.id);
  if (!cart) return res.status(404).send('No cart with the given cart ID.');

  res.send(cart);
});

module.exports = router;
