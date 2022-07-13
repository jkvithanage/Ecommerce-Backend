const mongoose = require('mongoose');
const Joi = require('joi');
const joiObjectId = require('joi-objectid')(Joi);

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        qty: {
          type: Number,
          default: 1,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postal: {
        type: String,
        required: true,
      },
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

function validateOrders(order) {
  const schema = Joi.object({
    userId: joiObjectId().required(),
    products: Joi.array().required(),
    address: Joi.object().required(),
    phone: Joi.number().required(),
    status: Joi.string().required(),
  });

  return schema.validate(order);
}

module.exports.Order = Order;
module.exports.validateOrders = validateOrders;
