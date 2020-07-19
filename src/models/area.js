const Joi = require('joi');
const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  }
});

const Area = mongoose.model('Area', areaSchema);

function validateArea(area) {
  const schema = Joi.object().keys({
    description: Joi.string().min(5).max(50).required()
  });

  return schema.validate(area);
}

exports.areaSchema = areaSchema;
exports.Area = Area;
exports.validate = validateArea;
