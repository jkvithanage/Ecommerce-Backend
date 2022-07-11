const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      tpye: String,
      enum: [USD, EUR, GBP],
      default: 'USD',
    },
    size: String,
    color: String,
  },
  { timestamp: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports.Product = Product;
