const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Area, validate } = require("../models/area");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const area = await Area.find()
    .select("-__v")
    .sort("description");
  res.send(area);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let area = new Area({ description: req.body.description });
  area = await area.save();

  res.send(area);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const area = await Area.findByIdAndUpdate(
    req.params.id,
    { description: req.body.description },
    {
      new: true
    }
  );

  if (!area)
    return res.status(404).send("The area with the given ID was not found.");

  res.send(area);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const area = await Area.findByIdAndRemove(req.params.id);

  if (!area)
    return res.status(404).send("The area with the given ID was not found.");

  res.send(area);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const area = await Area.findById(req.params.id).select("-__v");

  if (!area)
    return res.status(404).send("The area with the given ID was not found.");

  res.send(area);
});

module.exports = router;
