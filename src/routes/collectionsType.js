const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { CollectionType, validate } = require("../models/collectionType");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const collectionType = await CollectionType.find()
    .select("-__v")
    .sort("description");
  res.send(collectionType);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let collectionType = new CollectionType({ description: req.body.description });
  collectionType = await collectionType.save();

  res.send(collectionType);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const collectionType = await CollectionType.findByIdAndUpdate(
    req.params.id,
    { description: req.body.description },
    {
      new: true
    }
  );

  if (!collectionType)
    return res.status(404).send("The collectionType with the given ID was not found.");

  res.send(collectionType);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const collectionType = await CollectionType.findByIdAndRemove(req.params.id);

  if (!collectionType)
    return res.status(404).send("The collectionType with the given ID was not found.");

  res.send(collectionType);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const collectionType = await CollectionType.findById(req.params.id).select("-__v");

  if (!collectionType)
    return res.status(404).send("The collectionType with the given ID was not found.");

  res.send(collectionType);
});

module.exports = router;
