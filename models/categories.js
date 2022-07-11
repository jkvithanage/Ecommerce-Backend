const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: 'title',
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports.Category = Category;
