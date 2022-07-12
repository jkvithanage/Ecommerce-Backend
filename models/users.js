const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    methods: {
      generateAuthToken() {
        return jwt.sign(
          { _id: this._id, isAdmin: this.isAdmin },
          process.env.jwtPrivateKey
        );
      },
    },
  }
);

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
