const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false })
    // .then(() => winston.info(`Connected to ${db}...`));
    .then(() => console.log(`Connected to ${db}...`));
}
