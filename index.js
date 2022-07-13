require('dotenv').config();
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const categories = require('./routes/category');
const subcategories = require('./routes/subcategories');
const products = require('./routes/products');
const users = require('./routes/users');
const carts = require('./routes/carts');
const authenticate = require('./routes/authenticate');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Routes
app.use('/api/categories', categories);
app.use('/api/subcategories', subcategories);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/auth', authenticate);
app.use('/api/carts', carts);

mongoose
  .connect('mongodb://localhost/final-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('DB connection error: ', err));

const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => {
  console.log('Server running at port', port);
});
