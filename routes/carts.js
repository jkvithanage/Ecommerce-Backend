const { Cart } = require('../models/carts');
const express = require('express');
const router = express.Router();

// GET all carts
router.get('/', async (req, res) => {
  const carts = await Cart.find()
    .sort('-createdAt')
    .populate('userId')
    .populate('products');

  res.send(carts);
});

// GET cart by Id
router.get('/:id', async (req, res) => {
  const cart = await Cart.findById(req.params.id)
    .populate('userId')
    .populate('products');
  if (!cart)
    return res.status(404).send('Cart with the given id is not found.');

  res.send(cart);
});

// POST cart
router.post('/', async (req, res) => {
  const cart = new Cart(req.body);
  await cart.save();

  res.send(cart);
});

module.exports = router;
