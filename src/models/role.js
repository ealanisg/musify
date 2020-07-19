const Joi = require('joi');
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  }
});

const Role = mongoose.model('Role', roleSchema);

function validateRole(role) {
  const schema = Joi.object().keys({
    description: Joi.string().min(3).max(50).required()
  });

  return schema.validate(role);
}

exports.roleSchema = roleSchema;
exports.Role = Role;
exports.validate = validateRole;
