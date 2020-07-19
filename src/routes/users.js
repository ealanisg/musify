const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.get("/", async (req, res) => {
  const user = await User.find()
    .select("-__v, -password")
    .sort("description");
  res.send(user);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("The role with the given ID was not found.");
  res.send();
});

router.post("/", async (req, res) => {
  const { value, error } = validate(req.body);
  if (error) return res.status(400).send(error);

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
