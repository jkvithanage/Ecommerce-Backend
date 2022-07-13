const { Category } = require('../models/categories');
const express = require('express');
const auth = require('../middleware/auth');
const adminauth = require('../middleware/adminauth');
const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const categories = await Category.find().sort('name');
  res.send(categories);
});

// GET by Id
router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send('Category with the given id is not found.');

  res.send(category);
});

// POST
router.post('/', async (req, res) => {
  const category = new Category(req.body);

  await category.save();
  res.send(category);
});

// PUT
router.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!category)
    return res.status(404).send('Category with the given id is not found.');

  res.send(category);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send('Category with the given id is not found.');

  res.send(category);
});

module.exports = router;
