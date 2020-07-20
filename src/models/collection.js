const _ = require("lodash");
const Joi = require('joi');
const mongoose = require('mongoose');
const { CollectionType } = require('../models/collectionType');
const { Area } = require('../models/area');

const collectionSchema = new mongoose.Schema({
  description: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  items: {
    type: Number,
    default: 0,
    required: true
  },
  collectionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollectionType',
    required: true
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
    required: true
  }
});

const Collection = mongoose.model('collection', collectionSchema);

async function validateCollection(collection) {
  const schema = Joi.object().keys({
    description: Joi.string().min(5).max(50).required(),
    items: Joi.number().min(0).required(),
    collectionTypeId: Joi.objectId().required(),
    areaId: Joi.objectId().required()
  });

  const validation = schema.validate(collection);
  if(validation.error) {
    return { error: validation.error.details[0].message };
  }

  const collectionType = await CollectionType.findById(collection.collectionTypeId);
  if (!collectionType) return { error: 'Invalid collection type' };
  const area = await Area.findById(collection.areaId);
  if (!area) return { error: 'Invalid area' };

  collection['collectionType'] = collectionType;
  collection['area'] = area;

  const value = _.omit(collection, ['collectionTypeId', 'areaId']);
  return { value };
}

exports.collectionSchema = collectionSchema;
exports.Collection = Collection;
exports.validate = validateCollection;
