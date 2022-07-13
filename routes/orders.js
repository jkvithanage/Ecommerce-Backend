const express = require('express');
const { Order } = require('../models/orders');
const router = express.Router();

// GET all orders - admin only
router.get('/allorders', async (req, res) => {
  const orders = Order.find().sort('-createdAt');
  res.send(orders);
});

// GET order by Id
router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).send('User has not created any cart yet.');

  res.send(order);
});
