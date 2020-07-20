const _ = require("lodash");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const { Role } = require('../models/role');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  }]
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

async function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    rolesId: Joi.array().items(
      Joi.object().keys({
        id: Joi.objectId().required()
      })
    ).required()
  });

  const validation = schema.validate(user);
  if(validation.error) {
    return { error: validation.error.details[0].message };
  }

  const exists = await User.findOne({ email: user.email });
  if (exists) return { error: 'User already registered' };
  const roles = await Role.find({
    '_id': { $in: user.rolesId.map((r) => r.id) }
  });
  if(roles.length != user.rolesId.length) {
    return { error: 'Roles inconsistentes' };
  }
  user['roles'] = roles;
  const value = _.omit(user, ['rolesId']);
  return { value };
}

exports.User = User;
exports.validate = validateUser;
