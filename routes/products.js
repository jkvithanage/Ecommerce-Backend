const express = require('express');
const adminauth = require('../middleware/adminauth');
const auth = require('../middleware/auth');
const { Product } = require('../models/products');
const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const products = await Product.find()
    .sort('title')
    .populate('category')
    .populate('subcategory');
  res.send(products);
});

// GET by Id
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send('Product with the given id is not found.');

  res.send(product);
});

// POST
router.post('/', async (req, res) => {
  const product = new Product(req.body);

  await product.save();
  res.send(product);
});

// PUT
router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!product)
    return res.status(404).send('Product with the given id is not found.');
  res.send(product);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
    return res.status(404).send('Product with the given id is not found.');

  res.send(product);
});

module.exports = router;
