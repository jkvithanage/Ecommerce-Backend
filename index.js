require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
