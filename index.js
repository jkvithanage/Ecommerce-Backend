require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const categories = require('./routes/category');
const subcategories = require('./routes/subcategories');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/categories', categories);
app.use('/api/subcategories', subcategories);

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
