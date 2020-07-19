const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Role, validate } = require("../models/role");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const role = await Role.find()
    .select("-__v")
    .sort("description");
  res.send(role);
});

router.post("/", auth, async (req, res) => {
  const { error } = await validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let role = new Role({ description: req.body.description });
  role = await role.save();

  res.send(role);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const role = await Role.findByIdAndUpdate(
    req.params.id,
    { description: req.body.description },
    {
      new: true
    }
  );

  if (!role)
    return res.status(404).send("The role with the given ID was not found.");

  res.send(role);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const role = await Role.findByIdAndRemove(req.params.id);

  if (!role)
    return res.status(404).send("The role with the given ID was not found.");

  res.send(role);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const role = await Role.findById(req.params.id).select("-__v");

  if (!role)
    return res.status(404).send("The role with the given ID was not found.");

  res.send(role);
});

module.exports = router;
