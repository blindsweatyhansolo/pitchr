
const sequelize = require("../config/connection");
const {Model, DataTypes} = require("sequelize");
const { User } = require("../models");
const router = require("express").Router();


// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const user = await User.findAll({
  });
  res.json(user);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const user = await User.findAll({
    where: {
      id: req.params.id, 
    },
  });
  // be sure to include its associated Products
  res.json(user);
});

router.post("/", async (req, res) => {
  // create a new category
  await User.create(req.body);
  res.send()
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  await User.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.send()
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send()
});

module.exports = router;
