const express = require('express');

const auth = require('../routes/auth');
const roles = require('../routes/roles');
const users = require('../routes/users');
const areas = require('../routes/areas');
const collections = require('../routes/collections');
const collectionsType = require('../routes/collectionsType');
// const genres = require('../routes/genres');
// const customers = require('../routes/customers');
// const movies = require('../routes/movies');
// const rentals = require('../routes/rentals');
// const returns = require('../routes/returns');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/roles', roles);
  app.use('/api/users', users);
  app.use('/api/areas', areas);
  app.use('/api/collections', collections);
  app.use('/api/collections-type', collectionsType);
  // app.use('/api/genres', genres);
  // app.use('/api/customers', customers);
  // app.use('/api/movies', movies);
  // app.use('/api/rentals', rentals);
  // app.use('/api/returns', returns);
  app.use(error);
}
