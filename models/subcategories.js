const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports.Subcategory = Subcategory;
