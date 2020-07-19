const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Collection, validate } = require("../models/collection");
const express = require("express");
const router = express.Router();

// TODO: Refactor this to reuse
// const validExisting => (() => {
// })()

router.get("/", async (req, res) => {
  const collection = await Collection.find()
  .populate('collectionType')
  .populate('area')
    // .select("-__v")
    .sort("description");
  res.send(collection);
});

router.post("/", auth, async (req, res) => {
  const { value, error } = await validate(req.body);
  if (error) return res.status(400).send(error);

  let collection = new Collection(value);
  collection = await collection.save();

  res.send(collection);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { value, error } = await validate(req.body);
  if (error) return res.status(400).send(error);

  const collection = await Collection.findByIdAndUpdate(
    req.params.id,
    value,
    {
      new: true
    }
  );

  if (!collection)
    return res.status(404).send("The collection with the given ID was not found.");

  res.send(collection);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const collection = await Collection.findByIdAndRemove(req.params.id);

  if (!collection)
    return res.status(404).send("The collection with the given ID was not found.");

  res.send(collection);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const collection = await Collection.findById(req.params.id).select("-__v");

  if (!collection)
    return res.status(404).send("The collection with the given ID was not found.");

  res.send(collection);
});

module.exports = router;
