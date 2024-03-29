const { Subcategory } = require('../models/subcategories');
const auth = require('../middleware/auth');
const adminauth = require('../middleware/adminauth');

const express = require('express');
const router = express.Router();

// Get all subcategories
router.get('/', async (req, res) => {
  const subcategories = await Subcategory.find()
    .sort('name')
    .populate('parentId');
  res.send(subcategories);
});

// Get subcategory by id
router.get('/:id', async (req, res) => {
  const subcategory = await Subcategory.findById(req.params.id).populate(
    'parentId'
  );
  if (!subcategory)
    return res.status(404).send('Subcategory with the given id is not found.');

  res.send(subcategory);
});

// Post subcategory
router.post('/', auth, adminauth, async (req, res) => {
  const subcategory = new Subcategory(req.body);

  await subcategory.save();
  res.send(subcategory);
});

// Update subcategory
router.put('/:id', auth, adminauth, async (req, res) => {
  const subcategory = await Subcategory.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!subcategory)
    return res.status(404).send('Subcategory with the given id is not found.');

  res.send(subcategory);
});

// Delete subcategory
router.delete('/:id', auth, adminauth, async (req, res) => {
  const subcategory = await Subcategory.findByIdAndRemove(req.params.id);
  if (!subcategory)
    return res.status(404).send('Category with the given id is not found.');

  res.send(subcategory);
});

module.exports = router;
