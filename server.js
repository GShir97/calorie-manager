/*
Shir Goldstein 318493384
Sharon George 322211368
*/

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const routes = require('./routes');

app.use(express.json());
app.use(routes);


// connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://goldshir97:goldshir97@cluster0.3x8dz.mongodb.net/mongoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Enable Mongoose debugging
mongoose.set('debug', true);

// start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});