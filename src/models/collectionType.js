const Joi = require('joi');
const mongoose = require('mongoose');

const collectionTypeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  }
});

const CollectionType = mongoose.model('CollectionType', collectionTypeSchema);

function validateCollectionType(collectionType) {
  const schema = Joi.object().keys({
    // TODO: validate (historic, factic, contemporary, etc)
    description: Joi.string().min(5).max(50).required()
  });

  return schema.validate(collectionType);
}

exports.collectionTypeSchema = collectionTypeSchema;
exports.CollectionType = CollectionType;
exports.validate = validateCollectionType;
