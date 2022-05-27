const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User } = require("../../models");


// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const user = await User.findAll(
    {
      // attributes: { exclude: ['password'] }
    }
  );
  res.json(user);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const user = await User.findOne({
    where: {
      id: req.params.id, 
    },
  });
  // be sure to include its associated Products
  res.json(user);
});

router.post("/", async (req, res) => {
  // create a new category
  const user = await User.create(req.body);
  res.json(user)
});


router.put('/:id', (req, res) => {
  User.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
      }
  })
.then(dbUserData => {
  if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id!'})
      return;
  }
  res.json({ message: 'Password updated!'});  
  })   
.catch(err => {
  console.log(err);
  res.status(500).json({ message: 'Server error!'});
  });
})

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
