const mongoose = require('mongoose');
const express = require('express');
const { Order, validateOrders } = require('../models/orders');
const { Product } = require('../models/products');
const router = express.Router();

// GET all orders - admin only
router.get('/allorders', async (req, res) => {
  const orders = await Order.find().sort('createdAt');
  res.send(orders);
});

// GET order by Id
router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).send('No order with the given ID.');

  res.send(order);
});

// Create an order
router.post('/', async (req, res) => {
  const result = validateOrders(req.body);
  if (result.error) return res.status(400).send(result.error.message);

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    // save new order
    const order = new Order(req.body);
    await order.save(opts);

    // Update product stock of each purchased product
    const productsArr = req.body.products;
    for (let p of productsArr) {
      const product = await Product.findById(p.productId);
      if (product.stock < p.qty)
        return res.status(400).json({
          product: product,
          status: 'Product does not have enough stock.',
        });
      product.stock -= p.qty;
      product.salesCount++;
      await product.save(opts);
    }

    await session.commitTransaction();
    session.endSession();

    res.json({
      newOrder: order,
      status: 'Success',
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

// Update order
router.patch('/:id', async (req, res) => {
  const result = validateOrders(req.body);
  if (result.error) return res.status(400).send(result.error.message);

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).session(session);
    if (!order)
      return res.status(404).send('Order with the given id is not found.');

    const productsArr = req.body.products;
    for (let p of productsArr) {
      const product = await Product.findById(p.productId);
      if (product.stock < p.qty)
        return res.status(400).json({
          product: product,
          status: 'Product does not have enough stock.',
        });
      product.stock -= p.qty;
      product.salesCount++;
      await product.save(opts);
    }

    await session.commitTransaction();
    session.endSession();

    res.send({
      updatedOrder: order,
      status: 'Success',
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

module.exports = router;
