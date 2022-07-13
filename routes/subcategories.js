const { Subcategory } = require('../models/subcategories');
const auth = require('../middleware/auth');
const adminauth = require('../middleware/adminauth');

const express = require('express');
const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const subcategories = await Subcategory.find()
    .sort('name')
    .populate('parentId');
  res.send(subcategories);
});

// GET by Id
router.get('/:id', async (req, res) => {
  const subcategory = await Subcategory.findById(req.params.id).populate(
    'parentId'
  );
  if (!subcategory)
    return res.status(404).send('Subcategory with the given id is not found.');

  res.send(subcategory);
});

router.post('/', async (req, res) => {
  const subcategory = new Subcategory(req.body);

  await subcategory.save();
  res.send(subcategory);
});

// PUT
router.put('/:id', async (req, res) => {
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

// DELETE
router.delete('/:id', async (req, res) => {
  const subcategory = await Subcategory.findByIdAndRemove(req.params.id);
  if (!subcategory)
    return res.status(404).send('Category with the given id is not found.');

  res.send(subcategory);
});

module.exports = router;
